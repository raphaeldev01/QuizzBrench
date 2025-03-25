const Database = require("./databaseConfig")
const uniqid = require('uniqid')
const { getDoc, where, doc, collection, query, getDocs, setDoc, addDoc, updateDoc, FieldValue, arrayUnion } = require("firebase/firestore")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { addPopularity } = require("./QuizzDB")
const { SenderEmailForget } = require("../funcions/sendEmail")

const collectionUsers = collection(Database, "users")

const NewUser = async (userInfos) => {
  if (!userInfos.email || !userInfos.userId || !userInfos.password) return { error: true, msg: "Bad request!" }

  const snapQueryMail = (await getDocs(query(collection(Database, "users"), where("email", "==", userInfos.email)))).docs.length
  const snapQueryUser = (await getDocs(query(collection(Database, "users"), where("userId", "==", userInfos.userId)))).docs.length

  if (snapQueryMail > 0) return { error: true, msg: "Email unavailable!" }
  if (snapQueryUser > 0) return { error: true, msg: "userID unavailable!" }

  const secretToken = `${uniqid()}${uniqid()}${uniqid()}${uniqid()}${uniqid()}${uniqid()}`
  const date = new Date()

  const obj = {
    secretToken,
    ...userInfos,
    date,
    password: await bcrypt.hash(userInfos.password, 10),
    quizCreated: [],
    history: [],
    coins: 3
  }
  const token = jwt.sign({ id: userInfos.userId }, process.env.JWT_SECRET, { expiresIn: "3h" })


  try {
    addDoc(collectionUsers, obj)
    return { error: false, msg: "User added!", token }
  } catch (err) {
    return { error: true, msg: err }
  }
}

const LoginUser = async (userInfos) => {
  if (!userInfos.userId || !userInfos.password) return { error: true, msg: "Bad request" }

  const loginQuery = await (await getDocs(query(collectionUsers, where("userId", "==", userInfos.userId)))).docs

  if (loginQuery.length > 0) {
    const userData = loginQuery[0].data()
    const passCorrect = await bcrypt.compare(userInfos.password, userData.password)

    if (passCorrect) {
      const token = jwt.sign({ id: userInfos.userId }, process.env.JWT_SECRET, { expiresIn: "3h" })
      return { error: false, message: "ok", token }
    }
    else {
      return { error: true, msg: "Incorrect password" }
    }
  } else {
    return { error: true, msg: "User non-existent" }
  }
}

const forgetPassword = async (email) => {
  const userSnap = ((await getDocs(query(collectionUsers, where("email", "==", email)))).docs)

  if (userSnap.length > 0) {
    const user = userSnap[0].data()
    const code = Math.floor(Math.random() * 99999).toString().padStart(5, "0")
    const dateGen = new Date()

    try {
      updateDoc(userSnap[0].ref, {
        verifyCode: {
          code,
          dateGen
        }
      })
      SenderEmailForget(email, user.userId, code)
      return { error: false, msg: "" }
    } catch (err) {
      return { error: true, msg: err }
    }
  } else {
    return { error: true, msg: "Email non-existent" }
  }
}

const resetPasswordForgot = async (email, code, password) => {
  const userSnap = ((await getDocs(query(collectionUsers, where("email", "==", email)))).docs)

  

  if (userSnap.length > 0) {
    const user = userSnap[0].data()
    const date = new Date()
    const dateGen = new Date(user.verifyCode.dateGen * 1000) 
    const verifyCode = user.verifyCode

  
    

    if (verifyCode.code === code && (date - dateGen) < 600000) {
      console.log('oi');
      
      try {
        updateDoc(userSnap[0].ref, {
          password: await bcrypt.hash(password, 10),
        })
        return { error: false, msg: "" }
      } catch (err) {
        console.log(err);
        
        return { error: true, msg: err }
      }
    } else {
      return { error: true, msg: "Code incorrect or expired" }
    }

  } else {
    return { error: true, msg: "Email non-existent" }
  }
}

// resetPasswordForgot("raphael.developer@hotmail.com", "73104", "admin").then(console.log)

const AddQuizOnUserHistory = async (user, obj) => {
  const userSnap = (await getDocs(query(collectionUsers, where("userId", "==", user)))).docs

  if (userSnap.length > 0) {
    try {
      updateDoc(userSnap[0].ref, {
        history: arrayUnion(obj)
      })
      addPopularity(obj.quizId)
      return { error: false }
    } catch (err) {
      return { error: true, msg: err }
    }
  } else {
    return { error: true, msg: "userId incorrect" }
  }
}

const GetHistoryUser = async (userId) => {
  const userSnap = (await getDocs(query(collectionUsers, where("userId", "==", userId)))).docs

  if (userSnap.length > 0) {
    try {
      const datas = userSnap[0].data().history
      return { error: false, infos: datas }
    } catch (err) {
      return { error: true, msg: err }
    }
  } else {
    return { error: true, msg: "userId incorrect" }
  }
}

console.log(Math.floor(Math.random() * 99999).toString().padStart(5, "0"))

// GetHistoryUser("raphael").then(console.log)

module.exports = {
  NewUser,
  LoginUser,
  AddQuizOnUserHistory,
  GetHistoryUser,
  forgetPassword,
  resetPasswordForgot
}

// ===========================
//       TESTES DIRETOS
// ===========================

// NewUser({
//     email:"raphael123@gmail.com",
//     userId: "raphael321",
//     password: "admin"
// }).then(r => console.log(r))

// LoginUser({
//   userId: "raphael321",
//   password: "admin"
// }).then(r => console.log(r))