import React, {useEffect, useState} from "react";
import "./Kiddo.css"
import {useNavigate, useLocation, Route, Routes, useParams} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import {Oimg, Ximg} from "../img/exportImage";
import {get, onValue, ref, remove, update} from "firebase/database";
import {db} from "../firebase-config.jsx";

var pO;
var readyO = false;
var readyX = false;
var giveupO = false;
var giveupX = false;
var human = "X";
var ai = "O"
var tie = false;
var playable = false;
var win = false;
var winner = "";
var turn = false;
var row = [[],[],[],[],[]];
const gamepage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [showModal, setShowModal] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const [playerX, setPlayerX] = useState([]);
    const [playerO, setPlayerO] = useState([]);
    const [board, setBoard] = useState([]);
    const { currentUser, userName, roomPlayerRef, newRoomsForPlayerRef } = useAuth();

    //const urlRoom = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    const gameRoomsRef = ref(db, 'playerRoom');


    
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
    }, [])

    useEffect(() => {
        onValue(gameRoomsRef, (snapshot) => {
            const gameRooms = snapshot.val();
            setRoomList(gameRooms);
            // console.log(location);
            // console.log(params["*"]);
        })
    }, []);

    // useEffect(() => {
    //     setBoard(row);
    // }, []);

    useEffect(() => {
        Object.keys(roomList).map((room) => {
            if(location.state?.roomJoinUrl === "/lobby"){ //from lobby and choose create room
                // current url room id === roomId --> Check is correct room and loop player from this.
                if(params["*"] === roomList[room].roomId){
                    setPlayerO(Array.of(roomList[room].playerO));
                    setPlayerX(Array.of(roomList[room]?.playerX));
                }
            }
            if(params["*"] === location.state?.roomJoinUrl){ // Check previous url and current (roomJoinId -> see Browsegame join room )
                // useLocation() hook from browse
                // this is check player in room is correct
                if(params["*"] === roomList[room].roomId){
                    if(roomList[room]?.playerX?.uid !== ""){
                        if(currentUser.uid !== roomList[room].playerX.uid &&
                            params["*"] === roomList[room].roomId && roomList[room].playerO.name === ""){
                            update(ref(db, "playerRoom/" + room + "/playerO"), {
                                name: userName?.name,
                                uid: currentUser?.uid,
                            })
                        }
                        if(currentUser.uid !== roomList[room].playerO.uid &&
                            params["*"] === roomList[room].roomId && roomList[room].playerX.name === ""){
                            update(ref(db, "playerRoom/" + room + "/playerX"), {
                                name: userName?.name,
                                uid: currentUser?.uid,
                            })
                            console.log("In");
                        }
                    }
                    setPlayerX(Array.of(roomList[room]?.playerX));
                    setPlayerO(Array.of(roomList[room].playerO));
                }
            }

            // console.log("playerO : " + roomList[room]?.playerO?.name);
            // console.log("playerX : " + roomList[room]?.playerX?.name);
            // console.log("roomId : " + roomList[room]?.roomId);
            // console.log("roomName : " + roomList[room]?.roomName);
        })
        // console.log(board);
    }, [roomList]);

    const handleDeletePlayerRoom = async (e) => {
        e.preventDefault();
        Object.keys(roomList).map((room) => {
            if(params["*"] === roomList[room]?.roomId) {
                // X Leave !!!
                if (currentUser?.uid === roomList[room]?.playerX?.uid) { //
                    //console.log("X Leave");
                    if(roomList[room]?.playerX?.name){ //"test" -> !null
                        //console.log(roomList[room].playerX.name);
                        update(ref(db, "playerRoom/" + room + "/playerX"), {
                            name: "", // "" --> playerO's name // " "
                            uid: "", // "" --> playerO's uid // " "
                            isOwner: false,
                            readyStatus: false,
                        })
                    }
                    update(ref(db, "playerRoom/" + room + "/playerO"), {
                        isOwner: true,
                        readyStatus: false,
                    })
                }
                // O Leave !!!!!!!
                if (currentUser?.uid === roomList[room]?.playerO?.uid) { //
                    //console.log("X Leave");
                    if(roomList[room]?.playerO?.name){ //"test" -> !null
                        //console.log(roomList[room].playerX.name);
                        update(ref(db, "playerRoom/" + room + "/playerO"), {
                            name: "", // "" --> playerO's name // " "
                            uid: "", // "" --> playerO's uid // " "
                            isOwner: false,
                            readyStatus: false,
                        })
                    }
                    update(ref(db, "playerRoom/" + room + "/playerX"), {
                        isOwner: true,
                        readyStatus: false,
                    })
                }
            }
            // console.log(roomList[room]);
            // console.log(params["*"]);

            //game func
            if(params["*"] === roomList[room]?.roomId){
                if(true){

                }
            }
        })
        try {
            navigate("/browsegame", {
                state: {
                    previousUrl: location.pathname,
                },
            });
            await remove(`playerRoom/`);
            console.log(location.pathname)
            // console.log("delete room")
        }catch (e) {
            console.log(e.message);
        }
    };

    // UseEffect for update game mec
    useEffect(() => {
        Object.keys(roomList).map((room) => {
            if(params["*"] === roomList[room]?.roomId){
                //update ready state X
                if(roomList[room]?.playerX?.readyStatus == true){
                    var textx = document.getElementById("TextX");
                    textx.innerText = "Ready!";
                }else if(roomList[room]?.playerX?.readyStatus == false){
                    var textx = document.getElementById("TextX");
                    textx.innerText = "Not Ready";
                }
                //update ready state O
                if(roomList[room]?.playerO?.readyStatus == true){
                    var texto = document.getElementById("TextO");
                    texto.innerText = "Ready!";
                }else if(roomList[room]?.playerO?.readyStatus == false){
                    var texto = document.getElementById("TextO");
                    texto.innerText = "Not Ready";
                }

                // disable ready button when 2 player ready
                if(roomList[room]?.playerX?.readyStatus == true && roomList[room]?.playerO?.readyStatus == true){
                    update(ref(db, "playerRoom/" + room), {
                        GameStart: true,
                    })
                    var readyO = document.getElementById("ReadyO");
                    var readyX = document.getElementById("ReadyX");
                    readyO.disabled = true;
                    readyX.disabled = true;
                    readyO.style.opacity = 0.25;
                    readyX.style.opacity = 0.25;
                    
                }
                // change word depen to Turn
                if(roomList[room]?.Turn == roomList[room]?.playerX?.role){
                    var textx = document.getElementById("TextX");
                    textx.innerText = "Your Turn!";
                    var texto = document.getElementById("TextO");
                    texto.innerText = "Waiting...";
                }else if(roomList[room]?.Turn == roomList[room]?.playerO?.role){
                    var textx = document.getElementById("TextX");
                    textx.innerText = "Waiting...";
                    var texto = document.getElementById("TextO");
                    texto.innerText = "Your Turn!";
                }
            }
        })
    }, [roomList])

    //Check ready
    function setReady(button){
        Object.keys(roomList).map((room) => {
            if(params["*"] === roomList[room]?.roomId) {
                if(currentUser?.uid === roomList[room]?.playerX?.uid){
                    if(button === roomList[room]?.playerX?.role){
                        if(roomList[room]?.playerX?.readyStatus == false){
                            update(ref(db, "playerRoom/" + room + "/playerX"), {
                                readyStatus: true,
                            })
                        } else{
                            update(ref(db, "playerRoom/" + room + "/playerX"), {
                                readyStatus: false,
                            })
                        }
                        
                    }
                }else if(currentUser?.uid === roomList[room]?.playerO?.uid){
                    if(button === roomList[room]?.playerO?.role){
                        if(roomList[room]?.playerO?.readyStatus == false){
                            update(ref(db, "playerRoom/" + room + "/playerO"), {
                                readyStatus: true,
                            })
                        } else{
                            update(ref(db, "playerRoom/" + room + "/playerO"), {
                                readyStatus: false,
                            })
                        }
                    }
                }
            }
            
        })
    }

    //Check giveup
    function setGiveup(button){
        Object.keys(roomList).map((room) => {
            
        })
    }

    //when player click board
    function clickCol(event) {
        console.log(roomList);
        // Object.keys(roomList).map((room) => {
        //     console.log(room);
        // })

        Object.keys(roomList).map((room) => {
            console.log(room);
            if(params["*"] === roomList[room]?.roomId) {
                
                if(currentUser?.uid === roomList[room]?.playerX?.uid){
                    if(roomList[room]?.Turn == roomList[room]?.playerX?.role){
                        // checkWinner(row);
                        console.log(event.currentTarget);
                        if (win === false && tie === false && event.currentTarget.innerHTML === ""){
                            clickmark = true;
                            event.currentTarget.innerHTML = `<img src="${Ximg}"></img>`
                            turn = true;
                            // checkWinner(row);
                            console.log(win);
                            if(win == false && tie == false){
                                update(ref(db, "playerRoom/" + room), {
                                    Turn: "O",
                                })
                            }

                        } else if(win == true){
                            // ReadyPlayerReset();
                        }
                    }
                }else if(currentUser?.uid === roomList[room]?.playerO?.uid){
                    if(roomList[room]?.Turn == roomList[room]?.playerO?.role){
                        // checkWinner(row);
                        console.log(event.currentTarget);
                        if (win === false && tie === false && event.currentTarget.innerHTML === ""){
                            clickmark = true;
                            event.currentTarget.innerHTML = `<img src="${Oimg}"></img>`
                            turn = true;
                            // checkWinner(row);
                            console.log(win);
                            if(win == false && tie == false){
                                update(ref(db, "playerRoom/" + room), {
                                    Turn: "X",
                                })
                            }
                        } else if(win == true){
                            // ReadyPlayerReset();
                        }
                    }
                }
            }
        })
    

        
    }



    return (
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">
            <div className="absolute text-2xl ml-6 mt-6">
                <button onClick={handleDeletePlayerRoom} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-6 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK</button>
            </div>

            <div className="absolute bg-kiddoyellow w-2/12 py-8 left-0 bottom-0 rounded-r-3xl border-4 border-black text-black md:mb-[vh] lg:mb-[vh]">

                <div className="text-center text-4xl font-bold">TIME</div>

                <hr className="w-28 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />

                <div className="text-center text-2xl font-bold mb-4">{playerX.map((attr) => attr.name !== "") ? playerX.map((attr) => attr.name) : "Waiting..."}</div>
                {/*playerX.map((attr) => attr.name === "") ? playerX.map((attr) => attr.name) : "Waiting..."*/}

                <div className="text-center text-5xl font-bold">X</div>

                <hr className="w-28 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />

                <div id="TextX" className="text-center text-2xl font-bold">Not Ready</div>

                <hr className="w-28 h-1 mx-auto bg-kiddobrown border-0 rounded my-10" />

                <div className="flex items-center justify-center">
                    <button id="ReadyX" className="rounded-2xl text-black bg-kiddogreen bg-opacity-90 px-6 py-4 text-xl font-bold shadow-xl drop-shadow-kiddodropgreen duration-200 hover:bg-kiddogreenhover"
                    onClick={() => setReady("X")}>READY</button>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <button id="GiveupX" className="rounded-2xl text-white bg-kiddored bg-opacity-90 px-6 py-4 text-xl font-bold shadow-xl drop-shadow-kiddodropred duration-200 hover:bg-kiddoredhover"
                    onClick={() => setGiveup("X")}>GIVE UP</button>
                </div>

            </div>

            <div className="absolute bg-kiddobrown w-2/12 py-8 right-0 bottom-0 rounded-l-3xl border-4 border-white text-white md:mb-[vh] lg:mb-[vh]">

                <div className="text-center text-4xl font-bold">TIME</div>

                <hr className="w-28 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div className="text-center text-2xl font-bold mb-4">{playerO.map((attr) => attr.name !== "") ? playerO.map((attr) => attr.name) : "Waiting..."}</div>

                <div className="text-center text-5xl font-bold">O</div>

                <hr className="w-28 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div id="TextO" className="text-center text-2xl font-bold">Not Ready</div>

                <hr className="w-28 h-1 mx-auto bg-kiddoyellow border-0 rounded my-10" />

                <div className="flex items-center justify-center">
                    <button id="ReadyO" className="rounded-2xl text-black bg-kiddogreen bg-opacity-90 px-6 py-4 text-xl font-bold shadow-xl drop-shadow-kiddodropgreen duration-200 hover:bg-kiddogreenhover"
                    onClick={() => setReady("O")}>READY</button>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <button id="GiveupO" className="rounded-2xl text-white bg-kiddored bg-opacity-90 px-6 py-4 text-xl font-bold shadow-xl drop-shadow-kiddodropred duration-200 hover:bg-kiddoredhover"
                    onClick={() => setGiveup("O")}>GIVE UP</button>
                </div>

            </div>

            <div className="flex items-center justify-center">
                <div className="absolute top-0 md:mt-[20vh] lg:mt-[10vh]">
                    <div className="relative bg-slate-200 rounded-3xl border-4 border-black p-2">

                        <div className="flex justify-center" id="row1">
                            <div id="1-1" className="tdtd"></div>
                            <div id="1-2" className="tdtd"></div>
                            <div id="1-3" className="tdtd"></div>
                            <div id="1-4" className="tdtd"></div>
                            <div id="1-5" className="tdtd"></div>
                        </div>
                        <div className="flex justify-center" id="row2">
                            <div id="2-1" className="tdtd"></div>
                            <div id="2-2" className="tdtd"></div>
                            <div id="2-3" className="tdtd"></div>
                            <div id="2-4" className="tdtd"></div>
                            <div id="2-5" className="tdtd"></div>
                        </div>
                            <div className="flex justify-center" id="row3">
                            <div id="3-1" className="tdtd"></div>
                            <div id="3-2" className="tdtd"></div>
                            <div id="3-3" className="tdtd"></div>
                            <div id="3-4" className="tdtd"></div>
                            <div id="3-5" className="tdtd"></div>
                        </div>
                        <div className="flex justify-center" id="row4">
                            <div id="4-1" className="tdtd"></div>
                            <div id="4-2" className="tdtd"></div>
                            <div id="4-3" className="tdtd"></div>
                            <div id="4-4" className="tdtd"></div>
                            <div id="4-5" className="tdtd"></div>
                        </div>
                        <div className="flex justify-center" id="row5">
                            <div id="5-1" className="tdtd"></div>
                            <div id="5-2" className="tdtd"></div>
                            <div id="5-3" className="tdtd"></div>
                            <div id="5-4" className="tdtd"></div>
                            <div id="5-5" className="tdtd"></div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <div className="absolute bottom-0 md:mb-[vh] lg:mb-[vh]">
                    <button className="rounded-2xl text-black bg-kiddoyellow px-8 py-4 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">START</button>
                </div>
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