import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDDhpJBi08fd3dHi9EUfyBfpvoUCn6KWVE",
  authDomain: "team-7bf32.firebaseapp.com",
  projectId: "team-7bf32",
  storageBucket: "team-7bf32.firebasestorage.app",
  messagingSenderId: "218407869269",
  appId: "1:218407869269:web:ce31ead062389d6bd92ddc",
  measurementId: "G-JWFJ94RZ38"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});