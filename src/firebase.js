import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

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
const db = getFirestore(app);
const storage = getStorage(app) // Export Firebase Storage

// Funkcja do pobierania eventów z Firestore
const getEventsFromFirestore = async () => {
    const eventsCollection = collection(db, "events");
    const eventsSnapshot = await getDocs(eventsCollection);
    return eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export { auth, db, getEventsFromFirestore, storage };
