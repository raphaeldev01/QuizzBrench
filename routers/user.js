const express = require("express");
const router = express.Router()

const UserDB = require("../database/UsersDB")

router.post("/addhistory", async(req, res) => {
    const user = req.user.id;
    const obj = req.body;    

    const response = await UserDB.AddQuizOnUserHistory(user, obj)

    if(!response.error) {
        res.send(response)
    } else {
        res.status(403).send(response)
    }
})

router.get("/gethistory", async (req, res) => {
    const userId = req.user.id;
    const response = await UserDB.GetHistoryUser(userId)

    if(!response.error) {
        res.send(response)
    } else {
        res.status(403).send(response)
    }
})

module.exports = router