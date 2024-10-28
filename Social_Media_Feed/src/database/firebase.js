// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFfhF57I8wDRkhLcocLD5HdLB6hDa7TA4",
  authDomain: "social-media-feed-b3ab7.firebaseapp.com",
  projectId: "social-media-feed-b3ab7",
  storageBucket: "social-media-feed-b3ab7.appspot.com",
  messagingSenderId: "126201679648",
  appId: "1:126201679648:web:e6271fbe2b9770a5d31145",
  measurementId: "G-FK9PSQ9LYB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore(app)