const express = require("express");
const router = express.Router()

const SenderMail = require("../funcions/sendEmail")

const userDB = require("../database/UsersDB")

router.post("/newUser", async (req, res) => {
    const infos = req.body;

    const response = await userDB.NewUser(infos)

    if(response.error) {
        res.status(401).send(response)
    } else {
        res.send(response)
    }
})

router.post("/forgot", (req, res) => {
    const { email, user } = req.body

    userDB.forgetPassword(email)
    .then(response => {
        if(response.error) {
            res.status(403).send(response)
        } else {
            res.send(response)
        }
    })
})

router.post("/forgotReset", async (req, res) => {
    const { email, code, password } = req.body

    const response = await userDB.resetPasswordForgot(email, code, password)

    if(response.error) {
        res.status(403).send(response)
    } else {    
        res.send(response)
    }
})

router.post("/loginUser", async (req, res) => {
    const infos = req.body;

    const response = await userDB.LoginUser(infos)

    if(response.error) {
        res.status(401).send(response)
    } else {
        res.send(response)
    }
})

router.get("/", (req, res) => {

})

module.exports = router
