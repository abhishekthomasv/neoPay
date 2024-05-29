const { User } = require("../db")
const { Account } = require("../db")
const express = require("express")
const jwt = require("jsonwebtoken")
const zod = require("zod")
const JWT_SECRET = process.env.JWT_SECRET
const authMiddleware = require("../middlware")
const bcrypt = require("bcrypt")
const saltRounds = 10

const router = express.Router()

const signUpSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
})

router.post("/signup", async (req, res) => {
  const body = req.body
  const { success } = signUpSchema.safeParse(body)
  if (!success) {
    return res.status(400).json({
      msg: "Email already taken / Incorrect inputs",
    })
  }

  const existingUser = await User.findOne({
    username: body.username,
  })

  if (existingUser) {
    return res.json({
      msg: "Email already taken / Incorrect inputs",
    })
  }

  const hashedPassword = await bcrypt.hash(body.password, saltRounds)

  const user = await User.create({
    username: body.username,
    password: hashedPassword,
    firstName: body.firstName,
    lastName: body.lastName,
  })
  const token = jwt.sign({ userId: user._id }, JWT_SECRET)

  const userId = user._id

  await Account.create({ userId, balance: 1 + Math.random() * 1000 })

  return res.json({
    msg: "User created successfully",
    token: token,
  })
})

router.post("/signin", async (req, res) => {
  try {
    const { success } = signInSchema.safeParse(req.body)
    if (!success) {
      return res.status(411).json({
        msg: "Incorrect inputs",
      })
    }

    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({ username: username })

    const userAllowed = await bcrypt.compare(password, user.password)

    if (!userAllowed) {
      return res.status(404).json({
        msg: "Error while logging in",
      })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET)

    return res.status(200).json({
      token: token,
    })
  } catch (err) {
    return res.status(404).json({
      msg: "Error while logging in",
    })
  }
})

const updateUserSchema = zod.object({
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateUserSchema.safeParse(req.body)
  if (!success) {
    res.status(411).json({
      msg: "Error while updating information",
    })
  }
  await User.updateOne(req.body, { _id: req.userId })

  res.json({
    msg: "Updated successfully",
  })
})

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || ""
  const regexFilter = new RegExp(filter, "i")
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: regexFilter,
        },
      },
      {
        lastName: {
          $regex: regexFilter,
        },
      },
    ],
  })

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  })
})

router.get("/me", authMiddleware, async (req, res) => {
  User.aggregate([
    {
      $lookup: {
        from: "accounts",
        localField: "_id",
        foreignField: "userId",
        as: "accounts",
      },
    },
    {
      $project: {
        _id: 1, // include _id field
        username: 1, // Include username field
        firstName: 1, // Include firstName field
        lastName: 1, // Include lastName field
        "accounts.balance": 1, // Include the balance field from the embedded accounts array
      },
    },
  ])
    .exec()
    .then((result) => {
      // Send the JSON result to the frontend

      const currentUser = result.filter((user) => {
        if (user._id.toString() == req.userId) {
          return true
        }
      })

      return res.json(currentUser)
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ error: "An error occurred while fetching user details" })
    })
})

module.exports = router
