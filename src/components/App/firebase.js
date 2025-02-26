// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Firestore DB
import { getDatabase } from "firebase/database";  // Realtime DB
import { getAuth } from "firebase/auth";  // Authentication

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app); // ✅ Initialize the database instance

// Export Firebase instances
export { app, analytics, auth, db }; // ✅ Export db
export default app;
