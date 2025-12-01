import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider, GithubAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyDLRKMzgPz78ZGeTXy_khB8Zr8QbCWzOT8",

  authDomain: "cashflw-2b4f3.firebaseapp.com",

  projectId: "cashflw-2b4f3",

  storageBucket: "cashflw-2b4f3.firebasestorage.app",

  messagingSenderId: "71537411786",

  appId: "1:71537411786:web:17b046355a362ba0e29633",

  measurementId: "G-Q238N3XV8G"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export type FirebaseAuthUser = FirebaseUser;
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");


export default {app, db, auth};
