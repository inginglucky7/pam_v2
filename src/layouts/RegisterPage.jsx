import React, {useState, useRef, useEffect} from "react";
import "./Kiddo.css"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import {onValue, ref, get, set, push} from "firebase/database";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebase-config.jsx";
const registerpage = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState(null);
    const [userConfirmPassword, setUserConfirmPassword] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {signUp, currentUser, setUserName, userName, usersListRef, usersList} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleReg = async (e) => {
        e.preventDefault();
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError("Password do not match");
        }
        try {
            setError("")
            setLoading(true);
            await signUp(userEmail, userPassword);
            const playersList = ref(db, `usersList/${auth?.currentUser?.uid}`);
            set(playersList, {
                name: auth?.currentUser.email,
                email: auth?.currentUser.email,
                uid: auth?.currentUser?.uid,
                win: 0,
                correct: 0,
                score: 0,
            })
            navigate("/mainmenu", {replace : true});
        } catch (e) {
            setError("Failed to create account");
            alert("Please re-check your email and password")
            console.log(e.message);
        }
        setLoading(false);
    }

    const handleBack = () => {
        navigate("/", {replace: false});
    }
    return (
        
        <div className="kiddobg flex h-screen w-full items-center justify-center bg-kiddogray bg-cover bg-no-repeat">

            <div className="rounded-3xl bg-black px-10 py-6 bg-opacity-60 backdrop-blur">

                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <img src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383902408097862/Logo.png" className="kiddologo w-4/12" draggable="false" />
                        <h1 className="my-2 font-bold text-3xl">PAM's KIDDO</h1>
                        <h1 className="mb-8 font-bold text-2xl">TIC TAC TOE</h1>
                        <span className="text-gray-200 text-xl">Register</span>
                    </div>

                    <form action="#">

                        <div className="mb-4 flex justify-center text-black">
                            <input ref={emailRef} onChange={(event) => {setUserEmail(event.target.value)}} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-20 py-3 text-center placeholder-slate-500 shadow-lg drop-shadow-kiddodropshadow outline-none focus:ring-2 focus:ring-inset focus:ring-white" type="text" placeholder="USERNAME" />
                        </div>

                        <div className="mb-4 flex justify-center text-black">
                            <input ref={passwordRef} onChange={(event) => {setUserPassword(event.target.value)}} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-20 py-3 text-center placeholder-slate-500 shadow-lg drop-shadow-kiddodropshadow outline-none focus:ring-2 focus:ring-inset focus:ring-white" type="password" placeholder="PASSWORD" />
                        </div>

                        <div className="mb-8 flex justify-center text-black">
                            <input ref={confirmPasswordRef} onChange={(event) => {setUserConfirmPassword(event.target.value)}} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-20 py-3 text-center placeholder-slate-500 shadow-lg drop-shadow-kiddodropshadow outline-none focus:ring-2 focus:ring-inset focus:ring-white" type="password" placeholder="CONFIRM PASSWORD" />
                        </div>

                        <div className="mb-8 flex justify-center text-xl">
                            <button onClick={handleReg} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-10 py-4 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">REGISTER</button>
                        </div>

                        <div className="flex justify-center">
                            <button onClick={handleBack} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-16 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK TO LOGIN</button>
                        </div>

                    </form>
                </div>

            </div>

        </div>

    )
}

export default registerpage;