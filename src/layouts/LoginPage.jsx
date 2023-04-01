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

    const logInButtonOnNav = () => {
        const navigation = useNavigation();
        document.querySelector("#logInBtn").textContent =
            navigation.state === "submitting"
                ? "Register..."
                : navigation.state === "loading"
                ? "Finished"
                : "Let's Go";
        return (
            <>
                
            </>
        );
    };

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
                //Paul's work.
                alert("Pleas insert your email or password first");
            }
        }
    };

    const logOut = async () => {
        await signOut(auth);
    };

    return (

        <div>
                <div className="flex justify-center items-center bg-kiddogray w-screen h-screen">
                    <div className="grid grid-cols-2 bg-slate-50 w-[80%] h-[80%] rounded-3xl drop-shadow-2xl">
                        <div className="my-auto">
                            <img className="kiddologo w-6/12 h-6/12 mx-auto drop-shadow-md" src="https://cdn.discordapp.com/attachments/981506950569275482/1078961231815245824/Logo.png" draggable="false" />
                            <img className="w-6/12 h-6/12 mx-auto drop-shadow-md" src="https://cdn.discordapp.com/attachments/981506950569275482/1078970065866727444/Name.png" draggable="false" />
                        </div>
                        <div className="bg-slate-100 rounded-r-3xl w-full h-full">
                            <div>
                                <img className="xl:w-4/12 h-4/12 mx-auto drop-shadow-md mx-auto mt-[8%]
                                                lg:w-5/12 h-5/12 mx-auto drop-shadow-md mx-auto mt-[9%]
                                                md:w-7/12 h-7/12 mx-auto drop-shadow-md mx-auto mt-[13%]" 
                                src="https://cdn.discordapp.com/attachments/981506950569275482/1091016731419496488/Login.png" draggable="false" />
                                <div className="flex justify-center 
                                                xl:mt-[8%]
                                                lg:mt-[11%]
                                                md:mt-[13%]">
                                    <input className="xl:w-7/12 p-4 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    lg:w-8/12 p-3 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    md:w-9/12 p-3 drop-shadow-lg text-lg rounded-xl border-2 border-black"
                                    type="text" placeholder="USERNAME" />
                                </div>
                                <div className="flex justify-center
                                                xl:mt-[2%]
                                                lg:mt-[5%]
                                                md:mt-[7%]">
                                    <input className="xl:w-7/12 p-4 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    lg:w-8/12 p-3 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    md:w-9/12 p-3 drop-shadow-lg text-lg rounded-xl border-2 border-black"
                                    type="text" placeholder="PASSWORD" />
                                </div>
                                <div className="flex justify-center
                                                xl:mt-[8%]
                                                lg:mt-[11%]
                                                md:mt-[13%]">
                                    <button className="xl:w-4/12 p-4 font-bold text-3xl rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    lg:w-5/12 p-3 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    md:w-6/12 p-3 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover">LOGIN</button>
                                </div>
                                <div className="flex justify-center
                                                xl:mt-[2%]
                                                lg:mt-[5%]
                                                md:mt-[7%]">
                                    <button className="xl:w-6/12 p-2 font-bold text-xl rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    lg:w-7/12 p-1 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    md:w-8/12 p-1 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover">CREATE AN ACCOUNT</button>
                                </div>
                                <div className="flex justify-center
                                                xl:mt-[4%]
                                                lg:mt-[7%]
                                                md:mt-[9%]">
                                    <button className="xl:w-6/12 p-2 font-bold text-xl rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    lg:w-7/12 p-1 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    md:w-8/12 p-1 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover">LOGIN AS A GUEST</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default loginpage;