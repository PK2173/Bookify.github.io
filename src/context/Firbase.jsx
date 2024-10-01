import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged} from "firebase/auth";
import { getFirestore, collection, addDoc , getDocs, doc, getDoc, query, where} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBMMntjIYpf5qBPcVG-Lv1b3nGiQxi5kLE",
  authDomain: "bookify-13cc2.firebaseapp.com",
  projectId: "bookify-13cc2",
  storageBucket: "bookify-13cc2.appspot.com",
  messagingSenderId: "131103275479",
  appId: "1:131103275479:web:4adf78e6e98d632877b392",
};

export const useFirebase = () => useContext(FirebaseContext);

const FirebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(FirebaseApp)
const GoogleProvider = new GoogleAuthProvider()
const FireStore = getFirestore(FirebaseApp)
const Storage = getStorage(FirebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth,user => {
      if(user){
        setUser(user)
      }else{
        setUser(null)
      }
    })
  }, [])
  

  const signupUserWithEmailAndPassword = (email,password) =>{
    return createUserWithEmailAndPassword(firebaseAuth,email,password)
  }

  const signInUserEmailAndPassword = (email,password)=>{
    return signInWithEmailAndPassword(firebaseAuth,email,password)
  }

  const singInWithGoogle = () => signInWithPopup(firebaseAuth,GoogleProvider)

  const isLoggedIn = user ? true : false;

  const hendleCreateNewListing = async (Name, isbnNumber, price, coverPic)=>{
    const imageRef = ref(Storage, `uploads/images/${Date.now()}-${coverPic.name}`)
    const uploadResult = await uploadBytes(imageRef,coverPic);
    return await addDoc(collection(FireStore, 'books'),{
      Name,
      isbnNumber,
      price,
      imageURL:uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail:user.email,
      displayName:user.displayName,
      photoURL:user.photoURL
    })

  }

  const listAllBooks = ()=>{
    return getDocs(collection(FireStore, 'books'));
  }

  const getBookById = async(id)=>{
    const docRef = doc(FireStore, 'books', id)
    const result = await getDoc(docRef);
    return result
  }
  const getImageURL = (path)=>{
    return getDownloadURL(ref(Storage, path))
  }
  const placeOrder = async(bookId,qty)=>{
    const collectionRef = collection(FireStore,'books', bookId, 'orders')
    const result = await addDoc(collectionRef,{
      userID:user.uid,
      userEmail:user.email,
      displayName:user.displayName,
      photoURL:user.photoURL,
      qty:qty
    })
    return result
  }

  const fatchMyOrders = async()=>{
    const collectionRef = collection(FireStore, 'books');
    const q = query(collectionRef, where('userID', '==', user.uid));
    return await getDocs(q);
  }

  const getOrders = async(bookId)=>{
    const collectionRef = collection(FireStore,'books', bookId , 'orders')
    const result = await getDocs(collectionRef);
    return result
  }
  return (
    <FirebaseContext.Provider value={{signupUserWithEmailAndPassword,signInUserEmailAndPassword,singInWithGoogle, isLoggedIn,hendleCreateNewListing,listAllBooks,getImageURL,getBookById,placeOrder,fatchMyOrders,getOrders}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
