import React, { createContext, useContext ,useState,useEffect} from "react";
import {initializeApp} from 'firebase/app'
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA9dor9kLnRRPemv64_K61DiLCD2v9sxcY",
    authDomain: "bookify-4d488.firebaseapp.com",
    projectId: "bookify-4d488",
    storageBucket: "bookify-4d488.appspot.com",
    messagingSenderId: "580662465033",
    appId: "1:580662465033:web:0eff0353bd7e1a827f1ed8"
  };

const firebaseContext = createContext(null);

const firebaseApp = initializeApp(firebaseConfig)
export const useFirebase = ()=> useContext(firebaseContext);

const firebaseAuth = getAuth(firebaseApp)

const googleProvider = new GoogleAuthProvider();


export const FirebaseProvider = (props) => {
    const [user,setUser]= useState(null)

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, (user)=>{
            if(user){
                setUser(user)

            }
            else{
                setUser(null)

            }

        })
    })
    const signUp = (email,password)=>{
        createUserWithEmailAndPassword(firebaseAuth,email,password)
    
    }
    const signIn = (email,password)=>{
        signInWithEmailAndPassword(firebaseAuth,email,password)
    }
    const signInWithGoogle =()=>{
        signInWithPopup(firebaseAuth,googleProvider)
    }
    const isLoggedIn = user ? true : false; 

    
  return <firebaseContext.Provider value={{signUp,signIn,signInWithGoogle,isLoggedIn}}>{props.children}</firebaseContext.Provider>;
};
