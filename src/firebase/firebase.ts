// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZE8OSQlCYEIJ3GqiIW9eMqo0EE2qcRs0",
  authDomain: "photoholic-87cc0.firebaseapp.com",
  projectId: "photoholic-87cc0",
  storageBucket: "photoholic-87cc0.firebasestorage.app",
  messagingSenderId: "541869147014",
  appId: "1:541869147014:web:1cb11d4a6ff5a97d612207",
  measurementId: "G-P3G4K9S6WZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
