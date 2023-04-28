import React, {useEffect, useRef, useState} from "react";
import "./Kiddo.css"
import {useNavigate} from "react-router-dom";
import {auth} from "../firebase-config.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";

const loginpage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const logEmailRef = useRef();
    const logPassRef = useRef();
    const {signIn, signInAnonymous, currentUser, signInGoogle, setUserName} = useAuth();

    useEffect(() => {
        if(currentUser != null) {
            navigate("/mainmenu")
            if(currentUser?.isAnonymous){
                setUserName({
                    name: "Guest",
                    email: "Guest@Guest.com"
                })
            } else if(currentUser.displayName == null){
                setUserName({
                    name: currentUser.email,
                    email: currentUser.email
                })
            }
            else {
                setUserName({
                    name: currentUser.displayName,
                    email: currentUser.email,
                    photo: currentUser.photoURL
                })
            }
        } if(currentUser == null){
            navigate("/")
        }
    }, [currentUser])
    const handleLogInWithEmail = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            if(currentUser != null) {
                currentUser.displayName = currentUser.email;
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
            console.log(auth.currentUser.isAnonymous);

        } catch (e) {
            console.log(e.message);
        }
    }

    const handleSignInGoogle = async (e) => {
        e.preventDefault();
        try {
            await signInGoogle();
        } catch (e) {
            console.log(e.message);
            console.log(e.code);
        }
    }

    const navigateCreateAccount = async(e) => {
        e.preventDefault();
        navigate("/register", {replace : true});
    }

    return (

        <div className="kiddobg flex h-screen w-full items-center justify-center bg-kiddogray bg-cover bg-no-repeat">

            <div className="rounded-3xl bg-black px-10 py-6 bg-opacity-60 backdrop-blur">

                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <img src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383902408097862/Logo.png" className="kiddologo w-4/12" draggable="false" />
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
                            <button onClick={handleLogInAnonymous} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-16 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">LOGIN AS A GUEST</button>
                        </div>

                        <div className="mb-8 flex justify-center">
                            <button onClick={navigateCreateAccount} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-16 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">CREATE AN ACCOUNT</button>
                        </div>

                        <div className="flex justify-center">
                            <button onClick={handleSignInGoogle} className="flex items-center rounded-2xl bg-kiddored bg-opacity-90 px-12 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropred duration-200 hover:bg-kiddoredhover">
                            <img className="w-8 h-8 mr-2" src="https://cdn.discordapp.com/attachments/1097383654050762762/1097385357189849099/icons8-google-512.png" />SIGN IN WITH GOOGLE</button>
                        </div>

                    </form>
                </div>

            </div>

        </div>

    )
}

export default loginpage;