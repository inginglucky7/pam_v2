import React, {useContext, useEffect, useState, createContext, useRef} from "react";
import {auth} from "../firebase-config.jsx";
import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInAnonymously,
    signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import {redirect} from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState();
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
                console.log(currentUser);
                if(currentUser.isAnonymous){
                    setUserName("Guest");
                } else {
                    setUserName(currentUser?.displayName);
                }
                //console.log(user.uid);
            }if(user == null) {
                setCurrentUser(null);
            }
        });
    }, )

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