import './App.css'; // Import your CSS file
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebase from './firebase.js';
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import AppRouter from '../AppRouter';

function App() {
  const [data, setData] = useState([]);
  const [typelist, setTypelist] = useState([]);
  const [user, setUser] = useState(null); // Track user state
  const firestore = getFirestore(firebase);
  const auth = getAuth(firebase);

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

    return () => unsubscribeItems(); // Cleanup listener
  }, [firestore]);

  const handleItemDelete = async id => {
    if (user) {
      await deleteDoc(doc(firestore, `user/${user.uid}/item`, id));
    }
  };

  const handleItemSubmit = async newitem => {
    if (user) {
      await setDoc(doc(firestore, `user/${user.uid}/item`, newitem.id), newitem);
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
