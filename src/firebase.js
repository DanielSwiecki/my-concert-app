import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAZYYNyo0FiPx6iqab1x0mHlFS5rqmaN58",
    authDomain: "concert-25b85.firebaseapp.com",
    projectId: "concert-25b85",
    storageBucket: "concert-25b85.firebasestorage.app",
    messagingSenderId: "745616655966",
    appId: "1:745616655966:web:5906c759f1a084f02716cf",
    measurementId: "G-NYF68GZ3DP"
  };

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Dodajemy bazę danych

export { auth, db };
