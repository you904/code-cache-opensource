import {initializeApp} from 'firebase/app'
import {getAuth,setPersistence, browserLocalPersistence,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import firebase from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyCmmY25OKeGliPuoc0aziKOstsc9l76Px4",
    authDomain: "fir-react-9e397.firebaseapp.com",
    projectId: "fir-react-9e397",
    storageBucket: "fir-react-9e397.appspot.com",
    messagingSenderId: "257979441706",
    appId: "1:257979441706:web:8d34a51d26e91a1ba39953",
    measurementId: "G-4YFT53QTH9"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)