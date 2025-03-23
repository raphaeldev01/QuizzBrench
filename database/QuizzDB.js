const { addDoc, collection, getDocs, where, query, deleteDoc, updateDoc } = require("firebase/firestore")
const Database = require("./databaseConfig")
const uniqid = require("uniqid")

const imageAI = require('../AI/GenerateImage')

const newQuizz = async (infos) => {
    try {

        const { title, description, category, difficulty, questions, owner } = infos

        if (!title || !description || !category || !difficulty || !questions || !owner)
            return { error: true, msg: "Bad Request" }

        const quizId = uniqid()
        const date = new Date()
        const image = await imageAI.generateRandomImage();

        console.log(image);


        try {
            addDoc(collection(Database, "quizes"), {
                ...infos, quizId, date, image
            })

            return { error: false, message: "Quizz created successfully" }
        } catch (err) {
            console.log(err);
            return { error: true, message: err }
        }
    } catch {

    }
}

const getAllQuizzesFromUser = async (userId) => {
    if (!userId) return { error: true, msg: "Bad request!" }

    try {
        const docsSnap = (await getDocs(collection(Database, "quizes"), where("owner", "==", userId))).docs

        const allDocs = docsSnap.map(snap => snap.data())
        const docs = allDocs.filter(id => id.owner === userId)

        return { error: false, msg: "completed", quizzes: docs }
    } catch (err) {
        return { error: true, msg: err }
    }

}

const removeQuizzById = async (quizzId, userId) => {
    const quizzSnap = (await getDocs(query(collection(Database, "quizes"), where("quizId", "==", quizzId)))).docs

    if (quizzSnap.length > 0) {
        try {
            if (quizzSnap[0].data().owner == userId) {
                deleteDoc(quizzSnap[0].ref)
                return { error: false, msg: err }
            } else {
                throw "User don't have permission!"
            }
        } catch (err) {
            return { error: true, msg: err }
        }
    } else {
        return { error: true, msg: "quizzId incorrect!" }
    }
}

const getAllQuizzes = async () => {
    try {
        const datasSnaps = await ((await getDocs(query(collection(Database, "quizes")))).docs)
        const datas = datasSnaps.map(r => r.data())

        return { error: false, quizzes: datas }
    } catch (err) {
        return { error: true, msg: err }
    }

}

const getInfoQuizz = async (id) => {
    const quizzSnap = (await getDocs(query(collection(Database, "quizes"), where("quizId", "==", id)))).docs

    if (quizzSnap.length > 0) {
        try {
            const infos = quizzSnap[0].data()
            return { error: false, infos }
        } catch (err) {
            return { error: true, msg: err }
        }
    } else {
        return { error: true, msg: "quizzId incorrect!" }
    }
}

const addPopularity = async (id) => {
    if(!id) return { error: true, msg: "Bad request!" }
    const quizzSnap = (await getDocs(query(collection(Database, "quizes"), where("quizId", "==", id)))).docs

    if (quizzSnap.length > 0) {
        try {
            const infos = quizzSnap[0].data()
            updateDoc(quizzSnap[0].ref, {
                popularity: (infos.popularity ? infos.popularity : 0 )+ 1
            })
            return { error: false, }
        } catch (err) {
            return { error: true, msg: err }
        }
    } else {
        return { error: true, msg: "quizzId incorrect!" }
    }
}

module.exports = {
    newQuizz,
    getAllQuizzesFromUser,
    removeQuizzById,
    getAllQuizzes,
    getInfoQuizz,
    addPopularity
}


// id: quizId,
//         title:
//           quizId === "geography"
//             ? "World Geography"
//             : quizId === "history"
//               ? "Ancient History"
//               : quizId === "science"
//                 ? "Basic Science"
//                 : "Quiz",
//         description: "Test your knowledge with this quiz.",
//         category:
//           quizId === "geography"
//             ? "Geography"
//             : quizId === "history"
//               ? "History"
//               : quizId === "science"
//                 ? "Science"
//                 : "General",
//         difficulty: quizId === "history" ? "Hard" : "Medium",
//         questions: [
//           {
//             id: 1,
//             question: "What is the capital of France?",
//             options: [
//               { id: "a", text: "London" },
//               { id: "b", text: "Paris" },
//               { id: "c", text: "Berlin" },
//               { id: "d", text: "Madrid" },
//             ],
//             correctAnswer: "b",
//           },