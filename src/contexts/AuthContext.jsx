import React, {useContext, useEffect, useState, createContext} from "react";
import {auth} from "../firebase-config.jsx";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInAnonymously} from "firebase/auth";
import {redirect} from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
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
            if(currentUser != null){
                return redirect("/profile");
            }
            console.log(user);
        });
    }, [])

    const value = {
        currentUser,
        signUp,
        signIn,
        logOut,
        signInAnonymous
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}