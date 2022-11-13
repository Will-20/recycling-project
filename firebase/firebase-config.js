// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getFirestore } from 'firebase/firestore/lite';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS_Bgh1TKrxX0FsD7bCJgP6ZS7jolna0A",
  authDomain: "recyc-86ac1.firebaseapp.com",
  projectId: "recyc-86ac1",
  storageBucket: "recyc-86ac1.appspot.com",
  messagingSenderId: "417427675938",
  appId: "1:417427675938:web:162116a8205c296f45a37b",
  measurementId: "G-D3ZN4VWZBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

export default app;