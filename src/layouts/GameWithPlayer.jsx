import React, {useEffect, useState} from "react";
import "./Kiddo.css"
import {Link, NavLink, useNavigation, Outlet, redirect, useNavigate} from "react-router-dom";
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../firebase-config.jsx";
import mousePressed from "../AI/AI.jsx";
import {oImage, xImage} from "../img/exportImage";

const gamepage = () => {

    useEffect(() => {
        var humen = "X";
        var ai = "O"
        var win = false;
        var winner = "";
        var row = [[],[],[],[],[]];
        let row1 = document.querySelector("#row1").childNodes.forEach((row1) => row[0].push(row1));
        let row2 = document.querySelector("#row2").childNodes.forEach((row2) => row[1].push(row2));
        let row3 = document.querySelector("#row3").childNodes.forEach((row3) => row[2].push(row3));
        let row4 = document.querySelector("#row4").childNodes.forEach((row4) => row[3].push(row4));
        let row5 = document.querySelector("#row5").childNodes.forEach((row5) => row[4].push(row5));
        console.log(row);
        // console.log(row[1][0][0]);
        row[0].forEach((block) => block.addEventListener("click",clickCol));
        row[1].forEach((block) => block.addEventListener("click",clickCol));
        row[2].forEach((block) => block.addEventListener("click",clickCol));
        row[3].forEach((block) => block.addEventListener("click",clickCol));
        row[4].forEach((block) => block.addEventListener("click",clickCol));

        function clickCol(event) {
            if (win == false && event.currentTarget.innerHTML == ""){
                console.log(event.currentTarget);
                event.currentTarget.innerHTML = `<img src="${Ximg}"></img>`
                console.log(event.currentTarget.innerHTML);
            }
        }     
    })

    return (
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">
            <div className="absolute text-2xl ml-6 mt-6">
                <button onClick={mousePressed} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-6 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK</button>
            </div>

            <div className="flex items-center justify-center pt-6">

                <div className="rounded-3xl bg-black py-2 bg-opacity-80 backdrop-blur shadow-lg md:w-5/12 lg:w-3/12 xl:w-2/12">
                    <div className="flex items-center justify-center">
                        <img src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383902408097862/Logo.png" className="kiddologo w-3/12" draggable="false" />
                        <div className="relative text-white ml-8">
                            <h1 className="mb-4 font-bold text-2xl">PAM's KIDDO</h1>
                            <h1 className="font-bold text-xl">TIC TAC TOE</h1>
                        </div>
                    </div>
                </div>

            </div>

            <div className="absolute bg-kiddoyellow w-2/12 py-16 left-0 rounded-r-3xl border-4 border-black text-black mt-24">

                <div className="text-center text-4xl font-bold">TIME</div>

                <hr className="w-40 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold mb-4">MEK</div>

                <div className="text-center text-5xl font-bold">X</div>

                <hr className="w-40 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold">Your Turn...</div>

            </div>

            <div className="absolute bg-kiddobrown w-2/12 py-16 right-0 rounded-l-3xl border-4 border-white text-white mt-24">

                <div className="text-center text-4xl font-bold">TIME</div>

                <hr className="w-40 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold mb-4">ING</div>

                <div className="text-center text-5xl font-bold">O</div>

                <hr className="w-40 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold">Waiting...</div>

            </div>

            <div className="flex items-center justify-center pt-6">

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

        </div>

    )
}

export default gamepage;