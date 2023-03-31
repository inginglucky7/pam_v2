import React, {useState} from "react";
import "./Kiddo.css"
import {Link, NavLink, useNavigation, Outlet, redirect, useNavigate} from "react-router-dom";
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../firebase-config.jsx";

const loginpage = () => {
    const [user, setUser] = useState({});
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    console.log(auth?.currentUser?.email);
    const signIn = async (event) => {
        event.preventDefault();

        try {
            const user = await signInWithEmailAndPassword(auth, userEmail, userPassword);
            onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
            });
            setUser(auth);
            useNavigate();
            console.log(user);
        } catch (e) {
            console.log(e.message);
            if(e.message === "Firebase: Error (auth/missing-email)." || userPassword == null){
                //Paul's work
                alert("Pleas insert your email or password first");
            }
        }
    };

    const logOut = async () => {
        await signOut(auth);
    };

    return (

        <div className="bg-kiddobg w-screen h-screen bg-center relative">

            <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078956356566007868/BG1.png"
            className="w-full h-full absolute opacity-10" draggable="false" />

            <div className="flex justify-center">
                <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078961231815245824/Logo.png" 
                className="kiddologologin absolute w-2/12" draggable="false" />
                
                <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078970065866727444/Name.png" 
                className="absolute w-2/12 mt-[17%]" draggable="false" />
            </div>

            <div className="flex justify-center">
                <form className="absolute mt-[27%]">
                    <label>
                        <input onChange={(event) => {
                            setUserEmail(event.target.value);
                        }}
                            className="outline-transparent text-xl block w-[500px] p-4 rounded-t-3xl border-8 border-kiddoyellow drop-shadow-kiddodropshadow" type="text" placeholder="USERNAME" />
                    </label>
                    <br />
                    <label>
                        <input onChange={(event) => {
                            setUserPassword(event.target.value);
                        }}
                            className="outline-transparent text-xl block w-[500px] p-4 rounded-t-3xl border-8 border-kiddoyellow drop-shadow-kiddodropshadow" type="password" placeholder="PASSWORD" />
                    </label>
                </form>
            </div>

            <div className="flex justify-center">
                <div className="absolute mt-[42%]">
                    <button onClick={(event) => {
                        signIn(event);
                    }}
                        className="font-bold text-5xl block w-[300px] h-[100px] rounded-t-3xl bg-kiddoyellow hover:bg-kiddoyellowhover mx-auto drop-shadow-kiddodropshadow">
                        LOGIN</button>
                    <br />
                    <button className="font-bold text-3xl block w-[400px] h-[75px] rounded-t-3xl bg-kiddoyellow hover:bg-kiddoyellowhover drop-shadow-kiddodropshadow"
                    ><Link to="/register">CREATE AN ACCOUNT</Link></button>
                    <button onClick={logOut} className="font-bold text-3xl block w-[400px] h-[75px] rounded-t-3xl bg-kiddoyellow hover:bg-kiddoyellowhover drop-shadow-kiddodropshadow"
                    >Log Out</button>
                </div>
            </div>

            <div className="absolute right-0 bottom-0 pb-8 pr-4">
                <p className="text-xl">©TEAM PAM 2023</p>
            </div>

            <Outlet/>
        </div>
    )
}

export default loginpage;