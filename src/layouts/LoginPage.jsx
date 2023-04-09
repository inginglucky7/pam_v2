import React, {useEffect, useRef, useState} from "react";
import "./Kiddo.css"
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {auth} from "../firebase-config.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";

const loginpage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const logEmailRef = useRef();
    const logPassRef = useRef();
    const {signIn, signInAnonymous, currentUser, logOut, user, setUser} = useAuth();
    const [hasUser, setHasUser] = useState(false);
    const handleLogInWithEmail = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            if(!user.loggedIn){
                navigate("/mainmenu", {replace : true});
            }
            console.log(auth.currentUser.email);
        } catch (e) {
            console.log(e.message);
            console.log(auth.currentUser.email)
        }
    };

    const handleLogInAnonymous = async (e) => {
        e.preventDefault();
        try {
            await signInAnonymous();
            if(!user.loggedIn){
                navigate("/mainmenu", {replace : true});
            }
            console.log(auth.currentUser.isAnonymous);
        } catch (e) {
            console.log(e.message);
        }
    }

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logOut();
            console.log(auth?.currentUser?.email);
        } catch (e) {
            console.log(e.message)
        }
    }

    return (

        <div className="kiddobg flex h-screen w-full items-center justify-center bg-kiddogray bg-cover bg-no-repeat">

            <div className="rounded-3xl bg-black px-10 py-6 bg-opacity-60 backdrop-blur">

                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078961231815245824/Logo.png" className="kiddologo w-4/12" draggable="false" />
                        <h1 className="my-2 font-bold text-3xl">PAM's KIDDO</h1>
                        <h1 className="mb-8 font-bold text-2xl">TIC TAC TOE</h1>
                        <span className="text-gray-200 text-xl">Login</span>
                    </div>

                    <form action="#">

                        <div className="mb-4 flex justify-center text-black">
                            <input ref={logEmailRef} onChange = {(event) => {setEmail(event.target.value)}} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-20 py-3 text-center placeholder-slate-500 shadow-lg drop-shadow-kiddodropshadow outline-none focus:ring-2 focus:ring-inset focus:ring-white" type="text" placeholder="USERNAME" />
                        </div>

                        <div className="mb-8 flex justify-center text-black">
                            <input ref={logPassRef} onChange = {(event) => {setPassword(event.target.value)}} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-20 py-3 text-center placeholder-slate-500 shadow-lg drop-shadow-kiddodropshadow outline-none focus:ring-2 focus:ring-inset focus:ring-white" type="password" placeholder="PASSWORD" />
                        </div>

                        <div className="mb-8 flex justify-center text-xl">
                            <button onClick={handleLogInWithEmail} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-10 py-4 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">LOGIN</button>
                        </div>

                        <div className="mb-4 flex justify-center">
                            <button className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-16 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">LOGIN AS A GUEST</button>
                        </div>

                        <div className="mb-8 flex justify-center">
                            <button onClick={handleLogInAnonymous} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-16 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">CREATE AN ACCOUNT</button>
                        </div>

                        <div className="flex justify-center">
                            <button className="flex items-center rounded-2xl bg-kiddored bg-opacity-90 px-12 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropred duration-200 hover:bg-kiddoredhover">
                            <img className="w-8 h-8 mr-2" src="https://cdn.discordapp.com/attachments/981506950569275482/1094160577670164500/icons8-google-90.png" />SIGN IN WITH GOOGLE</button>
                        </div>

                    </form>
                </div>

            </div>

        </div>

    )
}

export default loginpage;