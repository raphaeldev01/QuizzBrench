require("dotenv").config()

// IMPORTS
const express = require("express");
const app = express();
const cors = require("cors")

// ROUTERS
const authRouter = require("./routers/auth")

// MIDLE 
app.use(express.json())
app.use(cors())

app.use("/auth", authRouter)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`ONLINE on port: ${PORT}`) )