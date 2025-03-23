const express = require("express")
const router = express.Router()

const quizzDB = require("../database/QuizzDB")

router.post("/create", async (req, res) => {
    const quizz = req.body;

    const response = await quizzDB.newQuizz(quizz)

    if(response.error) {
        res.status(404).send(response)
    }else {
        res.send(response)
    }
})

router.get("/getQuizzesByOwner", async(req, res) => {
    const user = req.user;
    console.log(user);
    

    const response = await quizzDB.getAllQuizzesFromUser(user.id)

    if(response.error) {
        res.status(404).send(response)
    }else {
        res.send(response)
    }
})

router.post("/removeQuizzByID", async (req, res) => {
    const user = req.user;
    const {quizzId} = req.body;

    const response = await quizzDB.removeQuizzById(quizzId, user.id)

    console.log(response);
    

    if(response.error) {
        res.status(404).send(response)
    }else {
        res.send(response)
    }
})

router.get("/getall",async  (req, res) => {
    const response = await quizzDB.getAllQuizzes()
    
    if(response.error) {
        res.status(404).send(response)
    }else {
        res.send(response)
    }
})

router.get("/get/:id", async (req, res) => {
    const id = req.params.id;

    const response = await quizzDB.getInfoQuizz(id)
    if(response.error) {
        res.status(404).send(response)
    }else {
        res.send(response)
    }
})

module.exports = router
