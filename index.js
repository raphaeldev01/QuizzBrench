require("dotenv").config()

// IMPORTS
const express = require("express");
const app = express();
const cors = require("cors")
const jwt = require("jsonwebtoken")

// ROUTERS
const authRouter = require("./routers/auth")
const quizzRouter = require("./routers/quizz")
const userRouter = require("./routers/user")

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send({error: true, msg: "Unauthorized"})

        try {
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }catch (err) {
            res.status(401).send({error: true, msg: "Unauthorized"})
        }
}

// MIDLE 
app.use(cors())
app.use(express.json())

app.use("/auth", authRouter)

app.use(authMiddleware)

app.use("/quizz", quizzRouter)
app.use("/user", userRouter)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`ONLINE on port: ${PORT}`) )