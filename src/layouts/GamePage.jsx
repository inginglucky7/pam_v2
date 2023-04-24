import React, {useEffect, useState} from "react";
import "./Kiddo.css"
import { useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import {Oimg, Ximg} from "../img/exportImage";

const gamepage = () => {
    const navigate = useNavigate();
    const { currentUser, userName } = useAuth();
    useEffect(() => {
        var humen = "X";
        var ai = "O"
        var tie = false;
        var playable = false;
        var win = false;
        var winner = "";
        var turn = false;
        var row = [[],[],[],[],[]];
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
        console.log(row);

        function clickCol(event) {
            console.log(win);
            if (win == false && event.currentTarget.innerHTML == "" && tie == false){
                event.currentTarget.innerHTML = `<img src="${Ximg}"></img>`
                turn = true;
                checkWinner(row);
                if(win == false){
                    AiMove();
                }
            }
        }    
        
        function AiMove(){
            if(turn == true && win == false && tie == false){
                let num1 = Math.floor(Math.random() * 5);
                let num2 = Math.floor(Math.random() * 5);
                if(row[num1][num2].innerHTML == ""){
                    row[num1][num2].innerHTML = `<img src="${Oimg}"></img>`
                    turn = false;
                    checkWinner(row);
                } else{
                    AiMove();
                }
            }
        }

        function checkWinner(board) {
            // Check rows
            for (let i = 0; i < 5; i++) {
              if (board[i][0].innerHTML != "" && board[i][0].innerHTML == board[i][1].innerHTML && board[i][1].innerHTML == board[i][2].innerHTML && board[i][2].innerHTML == board[i][3].innerHTML && board[i][3].innerHTML == board[i][4].innerHTML) {
                console.log(board[i][0].innerHTML);
                win = true;
                winner = board[i][0].innerHTML;
                console.log("Win row");
              }
            }
          
            // Check columns
            for (let i = 0; i < 5; i++) {
              if (board[0][i].innerHTML != "" && board[0][i].innerHTML == board[1][i].innerHTML && board[1][i].innerHTML == board[2][i].innerHTML && board[2][i].innerHTML == board[3][i].innerHTML && board[3][i].innerHTML == board[4][i].innerHTML) {
                win = true;
                winner = board[0][i].innerHTML;
                console.log("Win col");
              }
            }
          
            // Check diagonals
            if (board[0][0].innerHTML != "" && board[0][0].innerHTML == board[1][1].innerHTML && board[1][1].innerHTML == board[2][2].innerHTML && board[2][2].innerHTML == board[3][3].innerHTML && board[3][3].innerHTML == board[4][4].innerHTML) {
                win = true;
                winner = board[0][0].innerHTML;
                console.log("Win di");
            }
          
            if (board[0][4].innerHTML != "" && board[0][4].innerHTML == board[1][3].innerHTML && board[1][3].innerHTML == board[2][2].innerHTML && board[2][2].innerHTML == board[3][1].innerHTML && board[3][1].innerHTML == board[4][0].innerHTML) {
                win = true;
                winner = board[0][4].innerHTML;
            }
            for (let i = 0; i < 5; i++){
                if(playable == false){
                    for(let j = 0; j < 5; j++){
                        if(board[i][j].innerHTML == ""){
                            playable = true;
                        }
                    }
                }
            }

            if(playable == false){
                tie = true;
                console.log("tie");
            }else{
                playable = false;
            }
          
          }
    })

    return (
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">
            <div className="absolute text-2xl ml-6 mt-6">
                <button onClick={(e) => {
                    e.preventDefault();
                    navigate("/lobby");
                }} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-6 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK</button>
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

                <div className="text-center text-3xl font-bold mb-4">{userName.name}</div>

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