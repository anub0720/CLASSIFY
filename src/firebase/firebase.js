// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSSwJjbI2rtovxaDbAGGP1gfPI43m-KtM",
  authDomain: "classify-d0de5.firebaseapp.com",
  projectId: "classify-d0de5",
  storageBucket: "classify-d0de5.appspot.com",
  messagingSenderId: "197574417510",
  appId: "1:197574417510:web:57d276023c7aea7219a1a7",
  measurementId: "G-VEFR49N1PD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {app,auth,storage,db};

