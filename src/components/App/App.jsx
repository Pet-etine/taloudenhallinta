import './App.css'; // Import your CSS file
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebase from './firebase.js';
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import AppRouter from '../AppRouter';
import fetchData from "../../services/uploadData"; // Adjust path if necessary
import uploadData from "../../services/uploadData";
import { getDatabase, ref, get, onValue, child, set } from "firebase/database"; // Import correct methods
import { firebaseApp, db, firestore } from "./firebase";  // ✅ Correct import

function App() {
  const [data, setData] = useState([]);
  const [typelist, setTypelist] = useState([]);
  const [user, setUser] = useState(null); // Track user state
  const firestore = getFirestore(firebase);
  const auth = getAuth(firebase);
  const [items, setItems] = useState([]);  // ✅ Fix: Declare state

  // Combined useEffect for uploading data.json when user is signed in
  useEffect(() => {
    const uploadDataJson = async () => {
      try {
          const response = await fetch("/data.json");
          const jsonData = await response.json();
  
          if (!Array.isArray(jsonData)) {
              console.error("❌ Error: Data is not an array!", jsonData);
              return;
          }
  
          console.log("📤 Uploading data to Firebase...");
          await uploadData(jsonData);
          console.log("✅ Data uploaded successfully!");
  
          // Fetch items after uploading
          fetchItems();
      } catch (error) {
          console.error("❌ Error loading data.json:", error);
      }
  };

    if (user) {
      uploadDataJson(); // Call the upload function if the user is signed in
    }
  }, [user]); // Dependency array includes user

  useEffect(() => {
    if (user) {
      const unsubscribeTypes = onSnapshot(
        query(collection(firestore, `user/${user.uid}/type`), orderBy('type')),
        snapshot => {
          const newTypelist = [];
          snapshot.forEach(doc => {
            newTypelist.push(doc.data().type);
          });
          setTypelist(newTypelist);
        }
      );

      return () => unsubscribeTypes(); // Cleanup listener
    } else {
      setTypelist([]);
    }
  }, [user, firestore]);

  // Optimized fetchItems logic
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "items"));
        
        if (snapshot.exists()) {
          const itemsArray = Object.values(snapshot.val());

          // ✅ Prevent unnecessary updates if data hasn't changed
          setItems((prevItems) => {
            if (JSON.stringify(prevItems) !== JSON.stringify(itemsArray)) {
              return itemsArray;
            }
            return prevItems; 
          });

          if (process.env.NODE_ENV === 'development') {
            console.log("✅ Loaded items from Firebase:", itemsArray);
          }              
        } else {
          console.log("⚠️ No items found in Firebase.");
          setItems([]); 
        }
      } catch (error) {
        console.error("❌ Error fetching items:", error);
      }
    };

    if (!items.length) { // ✅ Only fetch if items is empty
      fetchItems();
    }
  }, [items]); // ✅ Depend only on `items`

  const unsubscribeItems = onSnapshot(
    query(collection(firestore, 'item'), orderBy('paymentDate')),
    snapshot => {
      const newData = [];
      snapshot.forEach(doc => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      setData(newData);
    },
    error => {
      console.error('Error fetching items: ', error);
    }
  );

  // Real-time listener for items
  useEffect(() => {
    const db = getDatabase(firebaseApp);
    const itemsRef = ref(db, "items");

    // Listen for real-time changes
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setItems(formattedData);
      } else {
        setItems([]); // Set an empty array if no data
      }
    });

    return () => {
      unsubscribeItems(); // Cleanup listener
    };
  }, []);

  const handleItemDelete = async id => {
    if (user) {
      await deleteDoc(doc(firestore, `user/${user.uid}/item`, id));
    }
  };

  const handleItemSubmit = (newItem) => {
    console.log("✅ Item received from form:", newItem);

    setItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      console.log("📌 Updated items list:", updatedItems);
      return updatedItems;
    });

    try {
      const database = getDatabase(); // Get Firebase database reference
      set(ref(database, `items/${newItem["Form ID"]}`), newItem)
        .then(() => console.log("✅ Data saved successfully!"))
        .catch((error) => console.error("❌ Error saving item to Firebase:", error));
    } catch (error) {
      console.error("❌ Firebase save error:", error);
    }
  };

  const handleTypeSubmit = async type => {
    if (user) {
      await addDoc(collection(firestore, `user/${user.uid}/type`), { type: type });
    }
  };

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Set user state after successful sign-in
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  return (
    <>
      {user ? (
        <AppRouter
          data={data}
          typelist={typelist}
          items={items} // ✅ Pass items here
          onItemSubmit={handleItemSubmit}
          onItemDelete={handleItemDelete}
          onTypeSubmit={handleTypeSubmit}
          auth={auth}
          user={user}
        />
      ) : (
        <div className="login-container">
          <h2>Please Sign In</h2>
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
      )}
    </>
  );
}

export default App;