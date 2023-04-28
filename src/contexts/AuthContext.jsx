import React, {useContext, useEffect, useState, createContext, useRef, useCallback} from "react";
import {auth} from "../firebase-config.jsx";
import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInAnonymously,
    signInWithPopup, GoogleAuthProvider
} from "firebase/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState({name: "", email: "", photo: ""});
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInAnonymous = () => {
        return signInAnonymously(auth);
    }

    const signInGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user);
                setUserLoggedIn(true);
                setLoading(false);
                console.log(currentUser);
            }
            else{
                setCurrentUser(null);
            }
        });
    }, []);

    useEffect(() => {
        if(currentUser?.isAnonymous){
            setUserName({
                name: "Guest",
                email: "Guest@Guest.com"
            })
        } else if(currentUser?.displayName == null){
            setUserName({
                name: currentUser?.email,
                email: currentUser?.email
            })
        }
        else {
            setUserName({
                name: currentUser?.displayName,
                email: currentUser?.email,
                photo: currentUser?.photoURL
            })
        }
    }, [currentUser])

    // if(loading){
    //     return <p>Loading...</p>
    // }

    const value = {
        currentUser,
        signUp,
        signIn,
        logOut,
        signInAnonymous,
        signInGoogle,
        userLoggedIn,
        setUserLoggedIn,
        userName,
        setUserName
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}