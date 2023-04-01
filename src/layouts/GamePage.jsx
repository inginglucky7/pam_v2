import React, {useState} from "react";
import "./Kiddo.css"
import {Link, NavLink, useNavigation, Outlet, redirect, useNavigate} from "react-router-dom";
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../firebase-config.jsx";

const gamepage = () => {

    return (

        <div>
                <div className="flex justify-center items-center bg-kiddogray w-screen h-screen">

                    <div className="absolute mb-[810px]">
                        <img className="w-3/12 h-3/12 mx-auto drop-shadow-md" src="https://cdn.discordapp.com/attachments/981506950569275482/1078961231815245824/Logo.png" draggable="false" />
                    </div>

                    <div className="absolute bg-kiddoyellow w-2/12 py-32 left-0 rounded-r-3xl border-4 border-white mt-16">
                        <div className="text-center text-3xl font-bold">MEK</div>

                        <div className="text-center text-5xl font-bold my-10">O</div>

                        <div className="text-center text-3xl font-bold">Your Turn...</div>
                    </div>
                    <div className="absolute bg-kiddobrown w-2/12 py-32 right-0 rounded-l-3xl border-4 border-white mt-16">
                        <div className="text-center text-3xl font-bold">ING</div>

                        <div className="text-center text-5xl font-bold my-10">X</div>

                        <div className="text-center text-3xl font-bold">Waiting...</div>
                    </div>

                    <div className="absolute left-0 top-0 mt-6 ml-6">
                        <div>
                            <button className="w-[100px] p-2 font-bold text-xl rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover">BACK</button>
                        </div>
                    </div>

                    <div className="relative bg-slate-200 p-8 rounded-3xl border-2 border-black mt-16">
                        <div className="flex justify-center">
                            <div className="tdtd hover:drop-shadow-xl"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                        </div>
                        <div className="flex justify-center">
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                        </div>
                        <div className="flex justify-center">
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                        </div>
                        <div className="flex justify-center">
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                        </div>
                        <div className="flex justify-center">
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                            <div className="tdtd"></div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default gamepage;