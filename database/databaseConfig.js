const firebase = require("firebase/app");
const firestore = require("firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyC73_Q18eXzefOQHD_4E4lVWXa7NCDPf9U",
    authDomain: "quizz-ebd91.firebaseapp.com",
    projectId: "quizz-ebd91",
    storageBucket: "quizz-ebd91.firebasestorage.app",
    messagingSenderId: "15813553852",
    appId: "1:15813553852:web:bf597c639329446dd76ab9",
    measurementId: "G-JV02HWE4S9"
  };

const app = firebase.initializeApp(firebaseConfig)
const Database = firestore.getFirestore(app)

module.exports = Database