import React, {useContext, useEffect, useState, createContext, useRef, useCallback} from "react";
import {auth, db} from "../firebase-config.jsx";
import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInAnonymously,
    signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import {ref, set} from "firebase/database";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState({name: "", email: "", photo: ""});
    const [loading, setLoading] = useState(true);
    const roomBotRef = ref(db, "botRooms/owners/" + userName?.name);
    const roomPlayerRef = ref(db, "playerRoom/" + userName?.name + "'s game");
    const userListRef = ref(db, `userList/${userName.name}`);
    useEffect(() => {
        if(currentUser?.isAnonymous){
            setUserName({
                name: "Guest",
                email: "Guest@Guest.com"
            })
        } else if(currentUser?.displayName == null){
            setUserName({
                name: currentUser?.email.substring(0, currentUser?.email.indexOf("@")),
                email: currentUser?.email
            })
        }
        else {
            setUserName({
                name: currentUser?.displayName.substring(0, currentUser?.displayName.indexOf(" ")),
                email: currentUser?.email,
                photo: currentUser?.photoURL
            })
        }
    }, [userName?.name, currentUser])

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user);
                setUserLoggedIn(true);
                setLoading(false);
                //console.log(currentUser);
            }
            else{
                setCurrentUser(null);
            }
        });
    }, [currentUser]);

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

    const setUserList = (user, email, name, createUserList = true) => {
        if (createUserList) {
            return set(userList, {
                username: user,
                email: email,
                playerName: name,
            });
        }
    };

    const createPlayerRoom = (user, userUid) => {
        return set(roomPlayerRef, {
            roomName: user + "'s game",
            roomId: userUid,
            "playerX": {
                name: user,
                uid: userUid,
                role: "X",
                isOwner: true,
                readyStatus: false,
            },
            "playerO": {
                name: "",
                uid: "",
                role: "O",
                isOwner: false,
                readyStatus: false,
            }
        })
    }

    const createBotRoom = (user, email) => {
        return set(roomBotRef, {
            username: user,
            userEmail: email
        })
    };

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
        setUserList,
        userLoggedIn,
        setUserLoggedIn,
        userName,
        setUserName,
        roomBotRef,
        roomPlayerRef,
        createPlayerRoom,
        createBotRoom
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}