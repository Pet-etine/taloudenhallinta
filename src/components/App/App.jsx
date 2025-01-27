import firebase from './firebase.js'
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import testdata from './testdata.js'
import AppRouter from '../AppRouter'
import { useState } from 'react'
import useLocalStorage from '../../shared/uselocalstorage'



function App() {

  const [data, setData] = useState([])
  const [typelist, setTypelist] = useLocalStorage('taloudenhallinta-typelist', [])
  const firestore = getFirestore(firebase)
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(firestore, 'type'),
      orderBy('type')),
      snapshot => {
        const newTypelist = []
        snapshot.forEach(doc => {
          newTypelist.push(doc.data().type)
        })
        setTypelist(newTypelist)
      })
    return unsubscribe
  }, [])





  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, 'item', id))
  }

  const handleItemSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'item', newitem.id), newitem)
    let copy = data.slice()

    const index = copy.findIndex(item => item.id === newitem.id)
    if (index >= 0) {
      copy[index] = newitem
    } else {
      copy.push(newitem)
    }

    copy.sort((a, b) => {
      const aDate = new Date(a.paymentDate)
      const bDate = new Date(b.paymentDate)
      return bDate - aDate
    })
    setData(copy)
  }
  const handleTypeSubmit = async (type) => {
    await addDoc(collection(firestore, 'type'), { type: type })
  }




  return (
    <>
      <AppRouter data={data}
        typelist={typelist}
        onItemSubmit={handleItemSubmit}
        onItemDelete={handleItemDelete}
        onTypeSubmit={handleTypeSubmit} />
      ```'


    </>
  )
}

export default App
