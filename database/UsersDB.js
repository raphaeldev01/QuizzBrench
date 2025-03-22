const Database = require("./databaseConfig")
const uniqid = require('uniqid') 
const { getDoc, where, doc, collection, query, getDocs, setDoc, addDoc } = require("firebase/firestore")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const collectionUsers = collection(Database, "users")

const NewUser = async (userInfos) => {  
    if(!userInfos.email || !userInfos.userId || !userInfos.password) return {error: true, msg: "Bad request!"}

    const snapQueryMail = (await getDocs(query(collection(Database, "users"), where("email", "==", userInfos.email)))).docs.length
    const snapQueryUser = (await getDocs(query(collection(Database, "users"), where("userId", "==", userInfos.userId)))).docs.length

    if(snapQueryMail > 0) return {error: true, msg: "Email unavailable!"} 
    if(snapQueryUser > 0) return {error: true, msg: "userID unavailable!"}
    
    const secretToken = `${uniqid()}${uniqid()}${uniqid()}${uniqid()}${uniqid()}${uniqid()}`
    const date = new Date()

    const obj = {
      secretToken,
      ...userInfos,
      date, 
      password: await bcrypt.hash(userInfos.password, 10),
      quizCreated: [],
      coins: 3
    }  
  
    try{
      addDoc(collectionUsers, obj)
      return {error: false, msg: "User added!"}
    }catch (err) {
      return {error: true, msg: err}
    }
}

const LoginUser = async (userInfos) => {
  if(!userInfos.userId || !userInfos.password) return { error:true, msg: "Bad request"}

  const loginQuery = await (await getDocs(query(collectionUsers, where("userId", "==", userInfos.userId)))).docs

  if(loginQuery.length > 0){
    const userData = loginQuery[0].data()
    const passCorrect = await bcrypt.compare(userInfos.password, userData.password)

    if(passCorrect) {
      const token = jwt.sign({id: userInfos.userId}, process.env.JWT_SECRET, {expiresIn: "1h"})
      return {error: false, message: "ok", token}
    }
    else {
      return {error: true, msg: "Incorrect password"}
    }
  }else {
    return {error: true, msg: "User non-existent"}
  }
}

module.exports = {
  NewUser,
  LoginUser
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