const express = require("express")
const authMiddleware = require("../middlware")
const { Account } = require("../db")
const mongoose = require("mongoose")

const router = express.Router()

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  })

  return res.json({
    balance: account.balance,
  })
})

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession()

  //start the transaction
  session.startTransaction()

  const { to, amount } = req.body

  const account = await Account.findOne({ userId: req.userId }).session(session)
  if (!account || account.balance < amount) {
    await session.abortTransaction()
    return res.status(400).json({
      msg: "Insufficient balance",
    })
  }

  const toAccount = await Account.findOne({ userId: to }).session(session)

  if (!toAccount) {
    await session.abortTransaction()
    return res.status(400).json({ msg: "Invalid account" })
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } },
    { session }
  )
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } },
    { session }
  )

  await session.commitTransaction()

  return res.json({
    msg: "transaction successful",
  })
})

module.exports = router
