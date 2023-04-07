import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDocs,
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9dor9kLnRRPemv64_K61DiLCD2v9sxcY",
  authDomain: "bookify-4d488.firebaseapp.com",
  projectId: "bookify-4d488",
  storageBucket: "bookify-4d488.appspot.com",
  messagingSenderId: "580662465033",
  appId: "1:580662465033:web:0eff0353bd7e1a827f1ed8",
};

const firebaseContext = createContext(null);

const firebaseApp = initializeApp(firebaseConfig);
export const useFirebase = () => useContext(firebaseContext);

const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  });
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signIn = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };
  const isLoggedIn = user ? true : false;
  console.log(user);

  const addListing = async (name, isbn, price, pic) => {
    const imageref = ref(
      storage,
      `/uploads/images/${Date.now()} - ${pic.name}`
    );
    const result = await uploadBytes(imageref, pic);

    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: result.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      photoURL: user.photoURL,
    });
  };
  const getAllBooks = async () => {
    return getDocs(collection(firestore, "books"));
  };
  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  const getBookById = async (id) => {
    const docref = doc(firestore, "books", id);
    const result = await getDoc(docref);

    return result;
  };
  const placeOrder = async (id, quantity) => {
    const collectionRef = collection(firestore, "books", id, "orders");
    const result = await addDoc(collectionRef, {
      userId: user.uid,
      userEmail: user.email,
      photoURL: user.photoURL,
      quantity: Number(quantity),
    });
    return result;
  };
  const fetchUsersOrder = async () => {
    const collectionref = collection(firestore, "books");
    const qry = query(collectionref, where("userId", "==", user && user.uid));

    const result = await getDocs(qry);
    return result;
  };

  const getOrders = async (id)=>{
    const collectionref = collection(firestore, "books",id,'orders');
    const result = await getDocs(collectionref);
    console.log(result)


  }

  return (
    <firebaseContext.Provider
      value={{
        signUp,
        signIn,
        signInWithGoogle,
        isLoggedIn,
        addListing,
        getAllBooks,
        getImageUrl,
        getBookById,
        placeOrder,
        fetchUsersOrder,
        user,
        getOrders
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};
