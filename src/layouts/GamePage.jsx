import React, {useEffect, useState, useMemo} from "react";
import "./Kiddo.css"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import {Oimg, Ximg} from "../img/exportImage";
import {QA} from "./Question.jsx";
import {ref, set, onValue, update, get, remove} from "firebase/database";
import {db} from "../firebase-config.jsx";

var TrueAns;
var click = false;
var clickmark = false;
var row = [[],[],[],[],[]];
var timebreak = false;
var alreadymove = false;
var human = "X"; // Santakorn Change humen -> human //
var ai = "O"
var tie = false;
var playable = false;
var win = false;
var winner = "";
var turn = false;
var ready = false;
var clickqte = false;
var isclicktimetrue = false;
var onevent = false;

const gamepage = () => {
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();
    const { currentUser, setCurrentUser, userName } = useAuth();
    const dbRef = ref(db);
    const roomBotRef = ref(db, "botRooms/owners/" + userName?.name);

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

        var PlayerReady = document.getElementById("PlayerReady");
        PlayerReady.addEventListener("click", playerready);
    }, [])

    function ReadyPlayerReset(){
        PlayerReady.disabled = false;
        PlayerReady.style.opacity = 1;
    }

    function reset(){
        tie = false;
        playable = false;
        win = false;
        ready = false;
        alreadymove = false;
        PlayerReady.disabled = false;
        click = false;
        PlayerReady.style.opacity = 1;
        winner = "";
        var divwin = document.getElementById("winner");
        divwin.innerText = ""
        row = [[],[],[],[],[]];
        document.querySelector("#row1").childNodes.forEach((row1) => row1.innerHTML = "");
        document.querySelector("#row2").childNodes.forEach((row2) => row2.innerHTML = "");
        document.querySelector("#row3").childNodes.forEach((row3) => row3.innerHTML = "");
        document.querySelector("#row4").childNodes.forEach((row4) => row4.innerHTML = "");
        document.querySelector("#row5").childNodes.forEach((row5) => row5.innerHTML = "");
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
        }

    function clickforqte(){
        clickqte = true;
    }

    function SetHelpBar(){
        onevent = true;
        isclicktimetrue = false;
        clickqte = false;
        const truebar = document.getElementById("truebar");
        const quick = document.getElementById("quick");
        const checkbar = document.getElementById("checkbar");
        const buttonqte = document.getElementById("buttonqte");
        const starttime = (Math.floor(Math.random() * 85) + 15);
        quick.hidden = false;
        buttonqte.hidden = false;
        console.log(starttime);
        console.log(-quick.clientWidth + (quick.clientWidth * starttime) / 100);
        truebar.style.width = "15%";
        truebar.style.transform = `translateX(${-quick.clientWidth + (quick.clientWidth * starttime) / 100}px)`;
        var percentNow = 0;
        var startqte = setInterval(qte, 1);
        function qte(){
            if(clickqte == true){
                clearInterval(startqte);
                if(percentNow <= starttime && percentNow >= starttime - 15){
                    isclicktimetrue = true;
                    console.log(isclicktimetrue);
                    checkdis();
                    function checkdis(){
                        if(Math.floor(Math.random() * 4) == 0 && TrueAns != "A"){
                            const btnA = document.getElementById("A");
                            btnA.style.opacity = 0.25;
                            btnA.disabled = true;
                            onevent = false;
                            setTimeout(() => {
                                const quick = document.getElementById("quick");
                                const buttonqte = document.getElementById("buttonqte");
                                quick.hidden = true;
                                buttonqte.hidden = true;
                            }, 1500);
                        } else if(Math.floor(Math.random() * 4) == 1 && TrueAns != "B"){
                            const btnB = document.getElementById("B");
                            btnB.style.opacity = 0.25;
                            btnB.disabled = true;
                            onevent = false;
                            setTimeout(() => {
                                const quick = document.getElementById("quick");
                                const buttonqte = document.getElementById("buttonqte");
                                quick.hidden = true;
                                buttonqte.hidden = true;
                            }, 1500);
                        } else if(Math.floor(Math.random() * 4) == 2  && TrueAns != "C"){
                            const btnC = document.getElementById("C");
                            btnC.style.opacity = 0.25;
                            btnC.disabled = true;
                            onevent = false;
                            setTimeout(() => {
                                const quick = document.getElementById("quick");
                                const buttonqte = document.getElementById("buttonqte");
                                quick.hidden = true;
                                buttonqte.hidden = true;
                            }, 1500);
                        } else if(Math.floor(Math.random() * 4) == 3 && TrueAns != "D"){
                            const btnD = document.getElementById("D");
                            btnD.style.opacity = 0.25;
                            btnD.disabled = true;
                            onevent = false;
                            setTimeout(() => {
                                const quick = document.getElementById("quick");
                                const buttonqte = document.getElementById("buttonqte");
                                quick.hidden = true;
                                buttonqte.hidden = true;
                            }, 1500);
                        } else{
                            checkdis();
                        }
                    }
                    
                    
                } else{
                    onevent = false;
                    console.log(isclicktimetrue);
                    setTimeout(() => {
                        const quick = document.getElementById("quick");
                        const buttonqte = document.getElementById("buttonqte");
                        quick.hidden = true;
                        buttonqte.hidden = true;
                    }, 1500);
                }
            } else if(percentNow >= 99){
                clearInterval(startqte);
            } else{
                percentNow += 0.1;
                const checkbar = document.getElementById("checkbar");
                checkbar.style.transform = `translateX(${(quick.clientWidth * percentNow) / 100}px)`;
            }
        }

    }

    function SetQuestion(){
        const Qarray = QA[Math.floor(Math.random() * 35)]
        if(Qarray.True == "A"){
            TrueAns = "A";
        } else if(Qarray.True == "B"){
            TrueAns = "B";
        }else if(Qarray.True == "C"){
            TrueAns = "C";
        }else{
            TrueAns = "D";
        }
        console.log(TrueAns);
        const question = document.getElementById("question");
        const btnA = document.getElementById("A");
        const btnB = document.getElementById("B");
        const btnC = document.getElementById("C");
        const btnD = document.getElementById("D");
        question.innerText = Qarray.Q;
        btnA.innerText = "A: " + Qarray.A;
        btnB.innerText = "B: " + Qarray.B;
        btnC.innerText = "C: " + Qarray.C;
        btnD.innerText = "D: " + Qarray.D;
        initBarCount();
        console.log("bar");
    }

    function initBarCount(){
        var alreadyhelp = false;
        var divTimeLeft = document.getElementById("TimeLeft");
        var divCountdownBar = document.getElementById("Countdownbar");
        var startTimer = setInterval(barCount, 30);
        var countp = 0.00;
        function barCount(){
            if(click == true){
                clearInterval(startTimer);
                timebreak = true;
                console.log("TimeBreak");
            }
            if(divTimeLeft.clientWidth < divCountdownBar.clientWidth && onevent == false){
                divTimeLeft.style.width = (countp + 0.2)+"%"
                countp += 0.2;
            } 
            else if(divTimeLeft.clientWidth == divCountdownBar.clientWidth && timebreak == false){
                divTimeLeft.style.width = divCountdownBar.clientWidth;
                clearInterval(startTimer);
                CheckQuestion("nah");
            }
            if(countp > 50 && alreadyhelp == false){
                SetHelpBar();
                alreadyhelp = true;
            }
        }
    }

    function TimeMark(){
        var divtime = document.getElementById("playertime");
        var timeremain = 10;
        divtime.innerText = timeremain;
        var countdown = setInterval(minustime, 1000);
        console.log("in timemark");
        function minustime(){
            if(timeremain > 0){
                timeremain--;
                var divtime = document.getElementById("playertime");
                divtime.innerText = timeremain;
                console.log("in minus time");
            }
            else{
                clearInterval(countdown);
                turn = true;
                var divtime = document.getElementById("playertime");
                divtime.innerText = "TIME";
                AiMove();
                console.log("inelse");
                setTimeout(() => {
                    setShowModal(true);
                    setTimeout(() => {
                        SetQuestion();
                        console.log("from click");
                        turn = false;
                        timebreak = false;
                    }, 1);
                }, 1500);
            }
            if(clickmark == true){
                var divtime = document.getElementById("playertime");
                divtime.innerText = "TIME";
                clearInterval(countdown);
                clickmark = false;
                console.log("inclick");
            }
        }
    }

    function CheckQuestion(button){
        click = true;
        console.log(TrueAns + " " + button);
        if(TrueAns == button){
            timebreak = true;
            console.log("True");
            setShowModal(false);
            alreadymove = true;
            TimeMark();
            setTimeout(() => {
                click = false;
            }, 50);
        } else {
            turn = true;
            setShowModal(false);
            alreadymove = false;
            setTimeout(() => {
                if(alreadymove == false && turn == true && win == false){
                    AiMove();
                    setTimeout(() => {
                        click = false;
                    }, 50);
                    setTimeout(() => {
                        setShowModal(true);
                        setTimeout(() => {
                            SetQuestion();
                            console.log("from check");
                            turn = false;
                            timebreak = false;
                        }, 1);
                    }, 1500);
                } else if(turn == true && alreadymove == false){
                    ReadyPlayerReset();
                }
            }, 1500);
        }
        // click = false;
    }

    function playerready(){
        reset();
        PlayerReady.disabled = true;
        PlayerReady.style.opacity = 0.5;
        ready = true;
        console.log("inplayer Ready");
        setShowModal(true);
        setTimeout(() => {
            SetQuestion();
            console.log("from ready");
            turn = false;
            timebreak = false;
        }, 1);
    }

    /// Santakorn change comparison ///
    function checkWinner(board) {
        // Check rows
        for (let i = 0; i < 5; i++) {
            if (board[i][0].innerHTML !== "" && board[i][0].innerHTML === board[i][1].innerHTML && board[i][1].innerHTML === board[i][2].innerHTML && board[i][2].innerHTML === board[i][3].innerHTML && board[i][3].innerHTML === board[i][4].innerHTML) {
                console.log(board[i][0].innerHTML);
                win = true;
                winner = board[i][0].innerHTML;
                var divwin = document.getElementById("winner");
                divwin.innerHTML = "Winner is: " + winner;
                ReadyPlayerReset();
                console.log(winner);
                console.log("Win row");
                console.log(win);
            }
        }

        // Check columns
        for (let i = 0; i < 5; i++) {
            if (board[0][i].innerHTML !== "" && board[0][i].innerHTML === board[1][i].innerHTML && board[1][i].innerHTML === board[2][i].innerHTML && board[2][i].innerHTML === board[3][i].innerHTML && board[3][i].innerHTML === board[4][i].innerHTML) {
                win = true;
                winner = board[0][i].innerHTML;
                var divwin = document.getElementById("winner");
                divwin.innerHTML = "Winner is: " + winner;
                ReadyPlayerReset();
                console.log(winner);
                console.log("Win col");
                console.log(win);
            }
        }

        // Check diagonals
        if (board[0][0].innerHTML !== "" && board[0][0].innerHTML === board[1][1].innerHTML && board[1][1].innerHTML === board[2][2].innerHTML && board[2][2].innerHTML === board[3][3].innerHTML && board[3][3].innerHTML === board[4][4].innerHTML) {
            win = true;
            winner = board[0][0].innerHTML;
            var divwin = document.getElementById("winner");
            divwin.innerHTML = "Winner is: " + winner;
            ReadyPlayerReset();
            console.log("Win di");
        }

        if (board[0][4].innerHTML !== "" && board[0][4].innerHTML === board[1][3].innerHTML && board[1][3].innerHTML === board[2][2].innerHTML && board[2][2].innerHTML === board[3][1].innerHTML && board[3][1].innerHTML === board[4][0].innerHTML) {
            win = true;
            winner = board[0][4].innerHTML;
            var divwin = document.getElementById("winner");
            divwin.innerHTML = "Winner is: " + winner;
            ReadyPlayerReset();
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
        console.log(alreadymove);
        console.log(event.currentTarget);
        if (win === false && tie === false && event.currentTarget.innerHTML === "" && ready === true && turn == false && alreadymove == true){
            clickmark = true;
            event.currentTarget.innerHTML = `<img src="${Ximg}"></img>`
            turn = true;
            checkWinner(row);
            console.log(win);
            alreadymove = false;
            if(win === false && tie === false){
                AiMove();
                setTimeout(() => {
                    setShowModal(true);
                    setTimeout(() => {
                        SetQuestion();
                        console.log("from click");
                        turn = false;
                        timebreak = false;
                    }, 1);
                }, 1500);
            }
        } else if(win == true){
            ReadyPlayerReset();
        }
    }

    function AiMove(){
        if(turn === true && win === false && tie === false){
            let num1 = Math.floor(Math.random() * 5);
            let num2 = Math.floor(Math.random() * 5);
            if(row[num1][num2].innerHTML === ""){
                row[num1][num2].innerHTML = `<img src="${Oimg}"></img>`
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

            <div className="absolute bg-kiddoyellow w-2/12 py-8 left-0 bottom-0 rounded-r-3xl border-4 border-black text-black lg:mb-[8%] xl:mb-[10%]">

                <div id="playertime" className="text-center text-4xl font-bold">TIME</div>

                <hr className="w-40 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />


                <div className="text-center text-3xl font-bold mb-4">{userName?.name}</div>

                <div className="text-center text-3xl font-bold mb-4">{userName.name}855</div>

                <div className="text-center text-5xl font-bold">X</div>

                <hr className="w-40 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold">Your Turn...</div>

                <hr className="w-40 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />

                <div className="flex items-center justify-center">
                    <button id="PlayerReady" className="rounded-2xl text-black bg-kiddogreen bg-opacity-90 px-6 py-4 text-xl font-bold shadow-xl drop-shadow-kiddodropgreen duration-200 hover:bg-kiddogreenhover">READY</button>
                </div>

            </div>

            <div className="absolute bg-kiddobrown w-2/12 py-8 right-0 bottom-0 rounded-l-3xl border-4 border-white text-white lg:mb-[14%] xl:mb-[14%]">

                <div className="text-center text-4xl font-bold">TIME</div>

                <hr className="w-40 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold mb-4">Opponent</div>

                <div className="text-center text-5xl font-bold">O</div>

                <hr className="w-40 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div className="text-center text-3xl font-bold">Ready!</div>

            </div>

            <div className="flex justify-center">
            
                <div id="table" className="absolute top-0 lg:mt-8 xl:mt-16">
                    
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
                <div id="winner" className="absolute text-center text-3xl font-bold mt-[30vh]"></div>
            </div>

            <div className="flex justify-center">
                <div className="absolute bottom-0 lg:mb-4 xl:mb-12">
                    
                    {/* Modal test */}
                    <button onClick={() => setShowModal(true)} className="rounded-2xl text-black font-bold bg-white px-4 py-4 text-2xl">MODAL</button>
                    {/* Modal test */}
                </div>
            </div>

            {showModal ? (
            <>
            <div className="flex justify-center items-center fixed inset-0 z-50">
                <div className="relative w-auto max-w-2xl drop-shadow-kiddodropshadowtwo">
                    <div className="rounded-2xl shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">

                        <div className="flex justify-center items-center p-6">
                        <div id="Countdownbar" style={{position: "relative", height: "5vh", width: "50vw", border: "2px black solid", background: "linear-gradient(to right, #D14545, #FFD045)"}}>
                                <div id="TimeLeft" style={{position: "relative", float: "right", background: "lightgray", height: "4.7vh", width: "0%"}}>
                                    
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold" style={{position: "absolute"}}>Question:</h3>

                        </div>

                        <div className="flex justify-center items-center p-6 border-b">
                            
                            <h3 id="question" className="text-2xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quasi delectus deserunt.</h3>

                        </div>

                        <div className="flex items-center justify-center p-6 border-t">

                            <button id="A" className="rounded-2xl text-black bg-kiddoyellow px-8 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                            onClick={() => CheckQuestion("A")}>A) ...</button>

                            <button id="B" className="rounded-2xl text-black bg-kiddoyellow px-8 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                            onClick={() => CheckQuestion("B")}>B) ...</button>

                        </div>

                        <div className="flex justify-center p-6">

                            <button id="C" className="rounded-2xl text-black bg-kiddoyellow px-8 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                            onClick={() => CheckQuestion("C")}>C) ...</button>

                            <button id="D" className="rounded-2xl text-black bg-kiddoyellow px-8 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                            onClick={() => CheckQuestion("D")}>D) ...</button>

                        </div>
                    </div>
                </div>
                    <div hidden id="quick" style={{position: "relative", height: "5vh", width: "50vw", border: "2px black solid", background: "lightgray"}}>
                    
                                <div id="truebar" style={{position: "relative", float: "right", background: "green", height: "4.7vh", width: "0%"}}>
                                    
                                </div>
                                <div id="checkbar" style={{position: "relative", float: "left", background: "red", height: "4.7vh", width: "1%"}}>
                                    
                                    </div>
                    </div>
                    <div hidden id="buttonqte">
                    <button className="rounded-2xl text-black bg-kiddoyellow px-8 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                            onClick={() => clickforqte()}>Click</button>

                    </div>
                    
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
            ) : null}

        </div>

    )
}

export default gamepage;