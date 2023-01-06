import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyBxx2e-cYL-LE0ovwLhRGtRt--QknNo1Kw",
    authDomain: "reading-mastery-7f9b1.firebaseapp.com",
    projectId: "reading-mastery-7f9b1",
    storageBucket: "reading-mastery-7f9b1.appspot.com",
    messagingSenderId: "231376283482",
    appId: "1:231376283482:web:549a09863484755aa27563",
    measurementId: "G-GD5EMJ0WBY"
  };



initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);