import React, {useEffect, useState, useMemo} from "react";
import "./Kiddo.css"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import {Oimg, Ximg} from "../img/exportImage";
import {ref, set, onValue, update, get, remove} from "firebase/database";
import {db} from "../firebase-config.jsx";

const gamepage = () => {
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();
    const { currentUser, setCurrentUser, userName } = useAuth();
    const dbRef = ref(db);
    const roomBotRef = ref(db, "botRooms/owners/" + userName.name);

    const handleDeleteBotRoom = async (e) => {
        e.preventDefault();
        try {
            await remove(roomBotRef);
            navigate(-1);
            console.log("delete")
        }catch (e) {
            console.log(e.message);
        }
    };
    var human = "X"; // Santakorn Change humen -> human //
    var ai = "O"
    var tie = false;
    var playable = false;
    var win = false;
    var winner = "";
    var turn = false;
    var row = [[],[],[],[],[]];
    useEffect(() => {
        document.querySelector("#row1").childNodes.forEach((row1) => row[0].push(row1));
        document.querySelector("#row2").childNodes.forEach((row2) => row[1].push(row2));
        document.querySelector("#row3").childNodes.forEach((row3) => row[2].push(row3));
        document.querySelector("#row4").childNodes.forEach((row4) => row[3].push(row4));
        document.querySelector("#row5").childNodes.forEach((row5) => row[4].push(row5));
        row[0].forEach((block) => block.addEventListener("click",clickCol));
        row[1].forEach((block) => block.addEventListener("click",clickCol));
        row[2].forEach((block) => block.addEventListener("click",clickCol));
        row[3].forEach((block) => block.addEventListener("click",clickCol));
        row[4].forEach((block) => block.addEventListener("click",clickCol));
    })

    /// Santakorn change comparison ///
    function checkWinner(board) {
        // Check rows
        for (let i = 0; i < 5; i++) {
            if (board[i][0].innerHTML !== "" && board[i][0].innerHTML === board[i][1].innerHTML && board[i][1].innerHTML === board[i][2].innerHTML && board[i][2].innerHTML === board[i][3].innerHTML && board[i][3].innerHTML === board[i][4].innerHTML) {
                console.log(board[i][0].innerHTML);
                win = true;
                winner = board[i][0].innerHTML;
                console.log("Win row");
                console.log(win);
            }
        }

        // Check columns
        for (let i = 0; i < 5; i++) {
            if (board[0][i].innerHTML !== "" && board[0][i].innerHTML === board[1][i].innerHTML && board[1][i].innerHTML === board[2][i].innerHTML && board[2][i].innerHTML === board[3][i].innerHTML && board[3][i].innerHTML === board[4][i].innerHTML) {
                win = true;
                winner = board[0][i].innerHTML;
                console.log("Win col");
                console.log(win);
            }
        }

        // Check diagonals
        if (board[0][0].innerHTML !== "" && board[0][0].innerHTML === board[1][1].innerHTML && board[1][1].innerHTML === board[2][2].innerHTML && board[2][2].innerHTML === board[3][3].innerHTML && board[3][3].innerHTML === board[4][4].innerHTML) {
            win = true;
            winner = board[0][0].innerHTML;
            console.log("Win di");
        }

        if (board[0][4].innerHTML !== "" && board[0][4].innerHTML === board[1][3].innerHTML && board[1][3].innerHTML === board[2][2].innerHTML && board[2][2].innerHTML === board[3][1].innerHTML && board[3][1].innerHTML === board[4][0].innerHTML) {
            win = true;
            winner = board[0][4].innerHTML;
        }
        for (let i = 0; i < 5; i++){
            if(playable === false){
                for(let j = 0; j < 5; j++){
                    if(board[i][j].innerHTML === ""){
                        playable = true;
                    }
                }
            }
        }

        /// Santakorn Fix here ///
        if(win === false && playable === false){
            tie = true;
            console.log("Tie true");
        } else {
            playable = false;
            tie = false;
        }
        // if(playable === false){
        //     tie = true;
        //     console.log("tie");
        // }

        // else{
        //     playable = false;
        // }
    }

    function clickCol(event) {
        checkWinner(row); /// Santakorn Add Here ///
        if (win === false && tie === false && event.currentTarget.innerHTML === ""){
            event.currentTarget.innerHTML = `<img src="${Ximg}"></img>`
            turn = true;
            checkWinner(row);
            if(win === false && tie === false){
                AiMove();
            }
        }
    }

    function AiMove(){
        if(turn === true && win === false && tie === false){
            let num1 = Math.floor(Math.random() * 5);
            let num2 = Math.floor(Math.random() * 5);
            if(row[num1][num2].innerHTML === ""){
                row[num1][num2].innerHTML = `<img src="${Oimg}"></img>`
                turn = false;
                checkWinner(row);
            } else{
                AiMove();
            }
        }
    }

    return (
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">
            <div className="absolute text-2xl ml-6 mt-6">
                <button onClick={handleDeleteBotRoom} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-6 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK</button>
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

                <div className="text-center text-3xl font-bold mb-4">Opponent</div>

                <div className="text-center text-5xl font-bold">O</div>

                <hr className="w-40 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold">Ready!</div>

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