import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDGnY-SgjQjAy9AgajzWmrd2L2nG4YYVs0",
  authDomain: "brandyproduct-aad38.firebaseapp.com",
  projectId: "brandyproduct-aad38",
  storageBucket: "brandyproduct-aad38.appspot.com",
  messagingSenderId: "569663279465",
  appId: "1:569663279465:web:84ed561375f51e1511edf8",
  measurementId: "G-GM0DTSMR1C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export default app;
export { auth, db, provider }