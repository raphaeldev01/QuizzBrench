require("dotenv").config()

// IMPORTS
const express = require("express");
const app = express();
const cors = require("cors")
const jwt = require("jsonwebtoken")
const path = require("path");

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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    next();
  });

// MIDLE 
app.use(cors({
    origin: "*", // Aceita requisições de qualquer origem
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}))

app.use(express.json())

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res, next) => {
    if(req.url.includes("/auth") || req.url.includes("/quizz") || req.url.includes("/user")) {
        console.log("URL");
        
        return next();
    }else {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    }

});


app.use("/auth", authRouter)

app.use(authMiddleware)

app.use("/quizz", quizzRouter)
app.use("/user", userRouter)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`ONLINE on port: ${PORT}`) )