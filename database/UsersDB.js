const Database = require("./databaseConfig")
const uniqid = require('uniqid') 
const { getDoc, where, doc, collection, query, getDocs, setDoc, addDoc } = require("firebase/firestore")

const collectionUsers = collection(Database, "users")

const NewUser = async (userInfos) => {  
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
    }  
  
    try{
      addDoc(collectionUsers, obj)
      return {error: false, msg: "User added!"}
    }catch (err) {
      return {error: true, msg: err}
    }
}

NewUser({
    email:"teste431131@gmail.com",
    userId: "raphael112"
}).then(r => console.log(r))