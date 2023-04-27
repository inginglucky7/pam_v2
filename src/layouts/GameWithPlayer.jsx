import React, {useEffect, useState} from "react";
import "./Kiddo.css"
import {Link, NavLink, useNavigation, Outlet, redirect, useNavigate} from "react-router-dom";
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../firebase-config.jsx";
import mousePressed from "../AI/AI.jsx";
import {Oimg, Ximg} from "../img/exportImage";

const gamepage = () => {

    useEffect(() => {
         
    })

    return (
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">
            <div className="absolute text-2xl ml-6 mt-6">
                <button onClick={(e) => {
                    e.preventDefault();
                    navigate("/lobby");
                }} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-6 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK</button>
            </div>

            <div className="absolute bg-kiddoyellow w-2/12 py-8 left-0 rounded-r-3xl border-4 border-black text-black mt-40">

                <div className="text-center text-4xl font-bold">TIME</div>

                <hr className="w-40 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold mb-4">{userName.name}</div>

                <div className="text-center text-5xl font-bold">X</div>

                <hr className="w-40 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold">Your Turn...</div>

                <hr className="w-40 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />

                <div className="flex items-center justify-center">
                    <button className="rounded-2xl text-black bg-kiddogreen bg-opacity-90 px-6 py-4 text-xl font-bold shadow-xl drop-shadow-kiddodropgreen duration-200 hover:bg-kiddogreenhover">READY</button>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <button className="rounded-2xl text-white bg-kiddored bg-opacity-90 px-6 py-4 text-xl font-bold shadow-xl drop-shadow-kiddodropred duration-200 hover:bg-kiddoredhover">GIVE UP</button>
                </div>

            </div>

            <div className="absolute bg-kiddobrown w-2/12 py-8 right-0 rounded-l-3xl border-4 border-white text-white mt-40">

                <div className="text-center text-4xl font-bold">TIME</div>

                <hr className="w-40 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold mb-4"></div>

                <div className="text-center text-5xl font-bold">O</div>

                <hr className="w-40 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold">Waiting...</div>

                <hr className="w-40 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div className="flex items-center justify-center">
                    <button className="rounded-2xl text-black bg-kiddogreen bg-opacity-90 px-6 py-4 text-xl font-bold shadow-xl drop-shadow-kiddodropgreen duration-200 hover:bg-kiddogreenhover">READY</button>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <button className="rounded-2xl text-white bg-kiddored bg-opacity-90 px-6 py-4 text-xl font-bold shadow-xl drop-shadow-kiddodropred duration-200 hover:bg-kiddoredhover">GIVE UP</button>
                </div>

            </div>

            <div className="flex items-center justify-center pt-20">

                <div className="relative bg-slate-200 rounded-3xl border-4 border-black p-2">

                    <div className="flex justify-center" id="row1">
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                    </div>
                    <div className="flex justify-center" id="row2">
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                    </div>
                        <div className="flex justify-center" id="row3">
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                    </div>
                    <div className="flex justify-center" id="row4">
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                    </div>
                    <div className="flex justify-center" id="row5">
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                        <div className="tdtd"></div>
                    </div>

                </div>

            </div>

            <div className="flex items-center justify-center p-4">
                <button className="rounded-2xl text-black bg-kiddoyellow px-8 py-4 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">START</button>
                
                {/* Modal test */}
                <button onClick={() => setShowModal(true)} className="rounded-2xl text-black font-bold bg-white px-4 py-4 text-2xl">MODAL</button>
                {/* Modal test */}
            
            </div>

            {showModal ? (
            <>
            <div className="flex justify-center items-center fixed inset-0 z-50">
                <div className="relative w-auto max-w-2xl drop-shadow-kiddodropshadowtwo">
                    <div className="rounded-2xl shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">

                        <div className="flex justify-center items-center p-6">
                            
                            <h3 className="text-3xl font-bold">Question:</h3>

                        </div>

                        <div className="flex justify-center items-center p-6 border-b">
                            
                            <h3 className="text-2xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quasi delectus deserunt.</h3>

                        </div>

                        <div className="flex items-center justify-center p-6 border-t">

                            <button className="rounded-2xl text-black bg-kiddoyellow px-8 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                            onClick={() => setShowModal(false)}>A) ...</button>

                            <button className="rounded-2xl text-black bg-kiddoyellow px-8 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                            onClick={() => setShowModal(false)}>B) ...</button>

                        </div>

                        <div className="flex items-center justify-center p-6">

                            <button className="rounded-2xl text-black bg-kiddoyellow px-8 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                            onClick={() => setShowModal(false)}>C) ...</button>

                            <button className="rounded-2xl text-black bg-kiddoyellow px-8 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                            onClick={() => setShowModal(false)}>D) ...</button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
            ) : null}

        </div>

    )
}

export default gamepage;