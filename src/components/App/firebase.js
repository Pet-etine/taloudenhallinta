// Tuodaan Firebase-sovelluksen alustusfunktio
import { initializeApp } from 'firebase/app'

// Määritellään sovelluksen Firebase-asetukset
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID
}

// Alustetaan Firebase-sovellus
const firebase = initializeApp(firebaseConfig)

export default firebase
