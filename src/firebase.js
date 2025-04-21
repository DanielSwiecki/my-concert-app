import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    increment
  } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
// Konfiguracja Firebase
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

// Polub event
const likeEvent = async (eventId, userId) => {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, {
      likedBy: arrayUnion(userId),
      likes: increment(1)
    });
  };
  
  // Cofnij polubienie
  const unlikeEvent = async (eventId, userId) => {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, {
      likedBy: arrayRemove(userId),
      likes: increment(-1)
    });
  };
  
  // Eksport
  export {
    auth,
    db,
    storage,
    getEventsFromFirestore,
    likeEvent,
    unlikeEvent
  };
