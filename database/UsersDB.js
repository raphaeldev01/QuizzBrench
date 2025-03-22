const Database = require("./databaseConfig")
const { getDoc, where, doc, collection, query, getDocs } = require("firebase/firestore")

const NewUser = async (userInfos) => {  
  collection(Database, "user")
    // const queryUser = query(collection(Database, "user"), where("user", "==", userInfos.user))

    const snapQueryMail = (await getDocs(query(collection(Database, "users"), where("email", "==", userInfos.email)))).docs.length
    const snapQueryUser = (await getDocs(query(collection(Database, "users"), where("username", "==", userInfos.user)))).docs.length

    if(snapQueryMail > 0) return {error: true, msg: "Email unavailable!"} 
    if(snapQueryUser > 0) return {error: true, msg: "Username unavailable!"} 
}

NewUser({
    email:"teste@gmail.com",
    user: "raphael"
})