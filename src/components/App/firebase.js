// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe0enmHJATz7oEhWWmYz2-ZJ-T8Xi_bXg",
  authDomain: "taloudenhallinta-62c54.firebaseapp.com",
  projectId: "taloudenhallinta-62c54",
  storageBucket: "taloudenhallinta-62c54.firebasestorage.app",
  messagingSenderId: "68073457951",
  appId: "1:68073457951:web:c0c67f7c80d7fd6593082a",
  measurementId: "G-N8TDPY1K3J",
  databaseURL: "https://taloudenhallinta-62c54-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);  // Realtime Database
const firestore = getFirestore(firebaseApp); // Firestore for document storage

// ✅ Export as named exports
export { firebaseApp, db, firestore };
export default firebaseApp;