import React, {useContext, useEffect, useState, createContext, useCallback} from "react";
import {auth, db} from "../firebase-config.jsx";
import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInAnonymously,
    signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import {ref, set, push, get} from "firebase/database";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState({name: "", email: "", photo: ""});
    const [loading, setLoading] = useState(true);
    const [roomIdPath, setRoomIdPath] = useState(null);
    const [newRoomsRef, setNewRoomsRef] = useState([]);
    const roomBotRef = ref(db, "botRooms/owners/" + userName?.name);
    const roomPlayerRef = ref(db, "playerRoom");
    const userListRef = ref(db, `userList/${userName.name}`);
    const [roomNumber, setRoomNumber] = useState(0);

    const createPlayerRoom = useCallback(async (user, userUid) => {
        const newRoomForPlayerRef = push(ref(db, "playerRoom/")); // generate a new unique key for the room by ing
        const roomId = newRoomForPlayerRef.key;
        await set(newRoomForPlayerRef, {
            roomName: user + "'s game",
            roomId: roomId,
            // board: [["", "", "", "", ""],["", "", "", "", ""],["", "", "", "", ""],["", "", "", "", ""],["", "", "", "", ""]],
            "playerX": {
                name: user,
                uid: userUid,
                role: "X",
                isOwner: true,
                readyStatus: false,
                xPlay: "",
            },
            "playerO": {
                name: "",
                uid: "",
                role: "O",
                isOwner: false,
                readyStatus: false,
                oPlay: "",
            }
        })
        return roomId;
    }, [roomIdPath, newRoomsRef]);

    useEffect(() => {
        // document.querySelector("#row1").childNodes.forEach((row1) => row[0].push(row1));
        // document.querySelector("#row2").childNodes.forEach((row2) => row[1].push(row2));
        // document.querySelector("#row3").childNodes.forEach((row3) => row[2].push(row3));
        // document.querySelector("#row4").childNodes.forEach((row4) => row[3].push(row4));
        // document.querySelector("#row5").childNodes.forEach((row5) => row[4].push(row5));
        // row[0].forEach((block) => block.addEventListener("click",clickCol));
        // row[1].forEach((block) => block.addEventListener("click",clickCol));
        // row[2].forEach((block) => block.addEventListener("click",clickCol));
        // row[3].forEach((block) => block.addEventListener("click",clickCol));
        // row[4].forEach((block) => block.addEventListener("click",clickCol));
    }, []);
    

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
        roomIdPath,
        setRoomIdPath,
        userLoggedIn,
        setUserLoggedIn,
        userName,
        setUserName,
        roomBotRef,
        roomPlayerRef,
        newRoomsRef,
        setNewRoomsRef,
        createPlayerRoom,
        createBotRoom,
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}