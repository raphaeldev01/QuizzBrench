const firebase = require("firebase/app");
const firestore = require("firebase/firestore")

const firebaseConfig = {
    apiKey: process.env.apiKey ,
    authDomain: process.env.authDomain ,
    projectId: process.env.projectId ,
    storageBucket: process.env.storageBucket ,
    messagingSenderId: process.env.measurementId ,
    appId: process.env.appId ,
    measurementId: process.env.measurementId 
  };

const app = firebase.initializeApp(firebaseConfig)
const Database = firestore.getFirestore(app)

module.exports = Database