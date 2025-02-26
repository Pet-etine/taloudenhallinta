import './App.css'; // Import your CSS file
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebase from './firebase.js';
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import AppRouter from '../AppRouter';
import fetchData from "../../services/uploadData"; // Adjust path if necessary
import uploadData from "../../services/uploadData";
import { ref, set } from "firebase/database";  // ✅ Import ref and set from Firebase Database
import { db } from "./firebase";  // ✅ Import db instance from firebase.js

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
        const response = await fetch('/data.json'); // Fetch JSON from public folder
        const dataToUpload = await response.json(); // Convert to JavaScript object
        await uploadData(dataToUpload);
        console.log("Data uploaded successfully!");
      } catch (error) {
        console.error("Error loading data.json:", error);
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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        if (Array.isArray(data)) {
          setItems(data);
          console.log("✅ Loaded items:", data);
        } else {
          console.error("❌ Data is not an array!", data);
        }
      } catch (error) {
        console.error("❌ Error fetching data.json:", error);
      }
    };

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

    fetchItems(); // Fetch items when the component mounts

    return () => {
      unsubscribeItems(); // Cleanup listener
    }; // Cleanup listener
  }, [firestore, user]); // Now it listens to user state as well

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
      const database = getDatabase();
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