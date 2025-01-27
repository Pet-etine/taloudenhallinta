import firebase from './firebase.js'
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import AppRouter from '../AppRouter'
import { useState } from 'react'

function App() {
  const [data, setData] = useState([])
  const [typelist, setTypelist] = useState([])
  const firestore = getFirestore(firebase)

  useEffect(() => {
    const unsubscribeTypes = onSnapshot(query(collection(firestore, 'type'), orderBy('type')), snapshot => {
      const newTypelist = []
      snapshot.forEach(doc => {
        newTypelist.push(doc.data().type)
      })
      setTypelist(newTypelist)
    }, error => {
      console.error("Error fetching types: ", error);
    });

    const unsubscribeItems = onSnapshot(query(collection(firestore, 'item'), orderBy('paymentDate')), snapshot => {
      const newData = []
      snapshot.forEach(doc => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      setData(newData);
    }, error => {
      console.error("Error fetching items: ", error);
    });

    return () => {
      unsubscribeTypes();
      unsubscribeItems();
    };
  }, [firestore]);

  const handleItemDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'item', id));
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  }

  const handleItemSubmit = async (newitem) => {
    try {
      await setDoc(doc(firestore, 'item', newitem.id), newitem);
      // No need to manually update state here, onSnapshot will handle it
    } catch (error) {
      console.error("Error submitting item: ", error);
    }
  }

  const handleTypeSubmit = async (type) => {
    try {
      await addDoc(collection(firestore, 'type'), { type: type });
    } catch (error) {
      console.error("Error submitting type: ", error);
    }
  }

  return (
    <>
      <AppRouter data={data}
        typelist={typelist}
        onItemSubmit={handleItemSubmit}
        onItemDelete={handleItemDelete}
        onTypeSubmit={handleTypeSubmit} />
    </>
  )
}

export default App