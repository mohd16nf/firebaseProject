import { createContext, useContext, useState, useEffect } from "react";
import {initializeApp} from 'firebase/app'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth'

import {getFirestore, collection, addDoc, getDocs} from 'firebase/firestore'
import {getStorage , ref, uploadBytes, getDownloadURL} from 'firebase/storage'

const FirebaseContext = createContext(null)

const firebaseConfig = {
    apiKey: "AIzaSyCbagWZoWq2vuWMGCTQF5Soq_fJWDQALeo",
    authDomain: "bookstore-f820b.firebaseapp.com",
    projectId: "bookstore-f820b",
    storageBucket: "bookstore-f820b.appspot.com",
    messagingSenderId: "709134738522",
    appId: "1:709134738522:web:339477146416d3697fa463"
  };

export const useFirebase = () => useContext(FirebaseContext)

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)

const fireStore = getFirestore(firebaseApp)

const storage = getStorage(firebaseApp)

const googleProvider = new GoogleAuthProvider()

export const FirebaseProvider = (props) =>{

    const [user, setUser] = useState(null)

    const signupUser = (email, password) =>{
        createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signinUser = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signinWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider)
        console.log('success')
    }

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user =>{
            if(user) setUser(user)
            else setUser(null)
        })
    })


    const createListing = async (name, isbnNumber, price, coverPic) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}_${coverPic.name}`)
        const uploadPic = await uploadBytes(imageRef, coverPic)
        await addDoc(collection(fireStore, 'books'), {
            name,
            isbnNumber,
            price,
            coverPic: uploadPic.ref.fullPath,
            userId: user.uid,
            userName: user.displayName,
            email: user.email,
            UserPic: user.photoURL
        })
    }

    const getBookLists = () => {
        return getDocs(collection(fireStore, "books"))
    }

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path))
    }

    const isLoggedIn = user ? true : false

    return <FirebaseContext.Provider value={{getImageURL, getBookLists, createListing, signinWithGoogle, signupUser, signinUser, isLoggedIn}}>{props.children}</FirebaseContext.Provider>
}

