const express = require("express");
const router = express.Router()

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

router.post

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
