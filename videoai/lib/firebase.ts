// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4eYXbdxvBZHbOhta9g3ds0VkaLRwkGko",
  authDomain: "videoaiassistant.firebaseapp.com",
  projectId: "videoaiassistant",
  storageBucket: "videoaiassistant.firebasestorage.app",
  messagingSenderId: "276148586404",
  appId: "1:276148586404:web:3fe979e404839486ff2331",
  measurementId: "G-50SHRKFTRM"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => signInWithPopup(auth, provider);
export const logout = async () => signOut(auth);
