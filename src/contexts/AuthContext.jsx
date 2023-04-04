import React, {useContext, useEffect, useState, createContext, useRef} from "react";
import {auth} from "../firebase-config.jsx";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInAnonymously} from "firebase/auth";
import {redirect} from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({loggedIn: false});
    const [currentUser, setCurrentUser] = useState(null);
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInAnonymous = () => {
        return signInAnonymously(auth);
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            console.log(user);
        });
    }, [])

    const value = {
        currentUser,
        signUp,
        signIn,
        logOut,
        signInAnonymous,
        user,
        setUser
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}