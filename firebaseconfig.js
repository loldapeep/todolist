// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuUeDvHN7FxhAFCgJJlTWk3QStkCYcATM",
  authDomain: "todolist-5a1f3.firebaseapp.com",
  projectId: "todolist-5a1f3",
  storageBucket: "todolist-5a1f3.appspot.com",
  messagingSenderId: "241493423041",
  appId: "1:241493423041:web:e6786dcb2dad89aa42b540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
export const db = getFirestore(app);
export default app;