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

        <div>
            <div className="flex justify-center items-center bg-kiddogray w-full h-full">
                <div className="grid grid-cols-2 bg-slate-50 w-[80%] h-[80%] rounded-3xl drop-shadow-2xl my-40">
                    <div className="my-auto">
                        <img className="kiddologo w-6/12 h-6/12 mx-auto drop-shadow-md" src="https://cdn.discordapp.com/attachments/981506950569275482/1078961231815245824/Logo.png" draggable="false" />
                        <img className="w-6/12 h-6/12 mx-auto drop-shadow-md" src="https://cdn.discordapp.com/attachments/981506950569275482/1078970065866727444/Name.png" draggable="false" />
                    </div>
                    <div className="bg-slate-100 rounded-r-3xl">
                        <div>
                            <img className="xl:w-4/12 h-4/12 mx-auto drop-shadow-md mx-auto mt-[7%]
                                                lg:w-5/12 h-5/12 mx-auto drop-shadow-md mx-auto mt-[7%]
                                                md:w-7/12 h-7/12 mx-auto drop-shadow-md mx-auto mt-[7%]"
                                 src="https://cdn.discordapp.com/attachments/981506950569275482/1091016731419496488/Login.png" draggable="false" />
                            <div className="flex justify-center
                                                xl:mt-[7%]
                                                lg:mt-[7%]
                                                md:mt-[7%]">
                                <input ref={logEmailRef} onChange = {(event) => {
                                    setEmail(event.target.value)
                                }
                                }
                                    className="xl:w-7/12 p-4 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    lg:w-8/12 p-3 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    md:w-9/12 p-3 drop-shadow-lg text-lg rounded-xl border-2 border-black"
                                       type="text" placeholder="USERNAME" />
                            </div>
                            <div className="flex justify-center
                                                xl:mt-[5%]
                                                lg:mt-[5%]
                                                md:mt-[5%]">
                                <input ref={logPassRef} onChange = {(event) => {
                                    setPassword(event.target.value)
                                }
                                }
                                       className="xl:w-7/12 p-4 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    lg:w-8/12 p-3 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    md:w-9/12 p-3 drop-shadow-lg text-lg rounded-xl border-2 border-black"
                                       type="password" placeholder="PASSWORD" />
                            </div>
                            <div className="flex justify-center
                                                xl:mt-[7%]
                                                lg:mt-[7%]
                                                md:mt-[7%]">
                                <button onClick={handleLogInWithEmail}
                                    className="xl:w-4/12 p-4 font-bold text-3xl rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    lg:w-5/12 p-3 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    md:w-6/12 p-3 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover">LOGIN</button>
                            </div>
                            <div className="flex justify-center
                                                xl:mt-[3%]
                                                lg:mt-[3%]
                                                md:mt-[3%]">
                                <button className="xl:w-6/12 p-2 font-bold text-xl rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    lg:w-7/12 p-1 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    md:w-8/12 p-1 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover"><Link to={"/register"}>CREATE AN ACCOUNT</Link></button>
                            </div>
                            <div className="flex justify-center
                                                xl:mt-[5%] mb-[7%]
                                                lg:mt-[5%] mb-[7%]
                                                md:mt-[5%] mb-[7%]">
                                <button onClick={handleLogInAnonymous}
                                    className="xl:w-6/12 p-2 font-bold text-xl rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
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