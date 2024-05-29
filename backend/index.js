const express = require("express")
const mainRouter = require("./routes/index")
const cors = require("cors")
// const corsOptions = {
//   origin: "https://neo-pay-server.vercel.app",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// }

const PORT = process.env.PORT | 3000

const app = express()
app.use(cors())

app.use(express.json())

app.use("/api/v1", mainRouter)

app.listen(PORT)
