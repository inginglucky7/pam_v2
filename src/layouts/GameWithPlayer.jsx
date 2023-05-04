import React, {useEffect, useState} from "react";
import "./Kiddo.css"
import {useNavigate, useLocation, Route, Routes, useParams} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import {Oimg, Ximg, Tieimg} from "../img/exportImage";
import {QA} from "./Question.jsx";
import {get, onValue, ref, remove, update} from "firebase/database";
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

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [showModal, setShowModal] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const [playerX, setPlayerX] = useState([]);
    const [playerO, setPlayerO] = useState([]);
    const [board, setBoard] = useState([]);
    const { currentUser, userName, roomPlayerRef, newRoomsForPlayerRef, usersList } = useAuth();

    //const urlRoom = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    const gameRoomsRef = ref(db, 'playerRoom');

    useEffect(() => {
        document.querySelector("#row1").childNodes.forEach((row1) => row[0].push(row1));
        document.querySelector("#row2").childNodes.forEach((row2) => row[1].push(row2));
        document.querySelector("#row3").childNodes.forEach((row3) => row[2].push(row3));
        document.querySelector("#row4").childNodes.forEach((row4) => row[3].push(row4));
        document.querySelector("#row5").childNodes.forEach((row5) => row[4].push(row5));
    }, [])

    useEffect(() => {
        onValue(gameRoomsRef, (snapshot) => {
            const gameRooms = snapshot.val();
            setRoomList(gameRooms);
            // console.log(location);
            // console.log(params["*"]);
        })
    }, []);

    useEffect(() => {
        Object.keys(roomList).map((room) => {

            if (roomList[room]?.playerX?.uid === "") { // Check if playerX name is empty
                if (roomList[room]?.playerO?.uid === "") { // Check if playerO name is also empty
                    remove(ref(db, "playerRoom/" + room));// Remove the entire room if both names are empty// Exit the map function early since the room has been removed
                }
            }

            if (roomList[room]?.playerO?.uid === "") { // Check if playerO name is empty
                if (roomList[room]?.playerX?.uid === "") { // Check if playerX name is also empty
                    remove(ref(db, "playerRoom/" + room)); // Remove the entire room if both names are empty// Exit the map function early since the room has been removed
                }
            }

            if(location.state?.roomJoinUrl === "/lobby"){ //from lobby and choose create room
                // current url room id === roomId --> Check is correct room and loop player from this.
                if(params["*"] === roomList[room].roomId){
                    setPlayerO(Array.of(roomList[room].playerO));
                    setPlayerX(Array.of(roomList[room]?.playerX));
                }
            }
            if(params["*"] === location.state?.roomJoinUrl){ // Check previous url and current (roomJoinId -> see Browsegame join room )
                // useLocation() hook from browse
                if(params["*"] === roomList[room].roomId){
                    if(roomList[room]?.playerX?.uid === ""){
                        if(currentUser.uid !== roomList[room].playerX.uid &&
                            params["*"] === roomList[room].roomId && roomList[room].playerO.name === ""){
                            update(ref(db, "playerRoom/" + room + "/playerO"), {
                                name: userName?.name,
                                uid: currentUser?.uid,
                            })
                        }
                        if(currentUser.uid !== roomList[room]?.playerO?.uid &&
                            params["*"] === roomList[room].roomId && roomList[room].playerX.name === ""){
                            update(ref(db, "playerRoom/" + room + "/playerX"), {
                                name: userName?.name,
                                uid: currentUser?.uid,
                            })
                            console.log("X In");
                        }
                    }

                    if(roomList[room]?.playerO?.uid === ""){
                        if(currentUser.uid !== roomList[room].playerX.uid &&
                            params["*"] === roomList[room].roomId && roomList[room].playerO.name === ""){
                            update(ref(db, "playerRoom/" + room + "/playerO"), {
                                name: userName?.name,
                                uid: currentUser?.uid,
                            })
                        }
                        if(currentUser.uid !== roomList[room]?.playerO?.uid &&
                            params["*"] === roomList[room].roomId && roomList[room].playerX.name === ""){
                            update(ref(db, "playerRoom/" + room + "/playerX"), {
                                name: userName?.name,
                                uid: currentUser?.uid,
                            })
                            console.log("O In");
                        }
                    }
                    setPlayerX(Array.of(roomList[room]?.playerX))
                    setPlayerO(Array.of(roomList[room]?.playerO))
                }
            }
            // console.log("playerO : " + roomList[room]?.playerO?.name);
            // console.log("playerX : " + roomList[room]?.playerX?.name);
            // console.log("roomId : " + roomList[room]?.roomId);
            // console.log("roomName : " + roomList[room]?.roomName);
        })
    }, [roomList]);

    const handleDeletePlayerRoom = async (e) => {
        e.preventDefault();
        Object.keys(roomList).map((room) => {

            if (roomList[room]?.playerX?.uid === "") { // Check if playerX name is empty
                if (roomList[room]?.playerO?.uid === "") { // Check if playerO name is also empty
                    remove(ref(db, `playerRoom/${room}`));// Remove the entire room if both names are empty// Exit the map function early since the room has been removed
                }
            }

            if (roomList[room]?.playerO?.uid === "") { // Check if playerO name is empty
                if (roomList[room]?.playerX?.uid === "") { // Check if playerX name is also empty
                    remove(ref(db, `playerRoom/${room}`)); // Remove the entire room if both names are empty// Exit the map function early since the room has been removed
                }
            }

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
                    update(ref(db, "playerRoom/" + room), {
                        roomName: roomList[room]?.playerO?.name + "'s game",
                    })
                }
                // O Leave !!!!!!!
                if (currentUser?.uid === roomList[room]?.playerO?.uid) {
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
                    update(ref(db, "playerRoom/" + room), {
                        roomName: roomList[room]?.playerX?.name + "'s game",
                    })
                }
            }
            // console.log(roomList[room]);
            // console.log(params["*"]);
        })
        try {
            navigate("/browsegame", {
                state: {
                    previousUrl: location.pathname,
                },
            });
            //console.log(params["*"]);
            //console.log(location.pathname)
            // console.log("delete room")
        }catch (e) {
            console.log(e.message);
        }
    };
    /// Santakorn change comparison ///

    useEffect(() => {
        Object.keys(roomList).map((room) => {
            if(params["*"] === roomList[room]?.roomId){
                // document.querySelector("#row1").childNodes.forEach((row1) => row[0].push(row1));
                // document.querySelector("#row2").childNodes.forEach((row2) => row[1].push(row2));
                // document.querySelector("#row3").childNodes.forEach((row3) => row[2].push(row3));
                // document.querySelector("#row4").childNodes.forEach((row4) => row[3].push(row4));
                // document.querySelector("#row5").childNodes.forEach((row5) => row[4].push(row5));
                // update(ref(db, "playerRoom/" + room), {
                //     board: [[document.querySelector("#row1").childNodes],[document.querySelector("#row2").childNodes],[document.querySelector("#row3").childNodes],
                //     [document.querySelector("#row4").childNodes],[document.querySelector("#row5").childNodes]],
                // })

                //update ready state X
                if(roomList[room]?.playerX?.readyStatus == true){
                    var textx = document.getElementById("TextX");
                    textx.innerText = "Ready!";
                    // row = [[],[],[],[],[]];
                    // document.querySelector("#row1").childNodes.forEach((row1) => row[0].push(row1));
                    // document.querySelector("#row2").childNodes.forEach((row2) => row[1].push(row2));
                    // document.querySelector("#row3").childNodes.forEach((row3) => row[2].push(row3));
                    // document.querySelector("#row4").childNodes.forEach((row4) => row[3].push(row4));
                    // document.querySelector("#row5").childNodes.forEach((row5) => row[4].push(row5));
                }else if(roomList[room]?.playerX?.readyStatus == false){
                    var textx = document.getElementById("TextX");
                    textx.innerText = "Not Ready";
                }
                //update ready state O
                if(roomList[room]?.playerO?.readyStatus == true){
                    var texto = document.getElementById("TextO");
                    texto.innerText = "Ready!";
                    // row = [[],[],[],[],[]];
                    // document.querySelector("#row1").childNodes.forEach((row1) => row[0].push(row1));
                    // document.querySelector("#row2").childNodes.forEach((row2) => row[1].push(row2));
                    // document.querySelector("#row3").childNodes.forEach((row3) => row[2].push(row3));
                    // document.querySelector("#row4").childNodes.forEach((row4) => row[3].push(row4));
                    // document.querySelector("#row5").childNodes.forEach((row5) => row[4].push(row5));
                }else if(roomList[room]?.playerO?.readyStatus == false){
                    var texto = document.getElementById("TextO");
                    texto.innerText = "Not Ready";
                }

                // disable ready button when 2 player ready
                if(roomList[room]?.GameStart == true){
                    update(ref(db, "playerRoom/" + room), {
                        GameStart: true,
                    })
                    var readyO = document.getElementById("ReadyO");
                    var readyX = document.getElementById("ReadyX");
                    readyO.disabled = true;
                    readyX.disabled = true;
                    readyO.style.opacity = 0.25;
                    readyX.style.opacity = 0.25;

                } else{
                    var readyO = document.getElementById("ReadyO");
                    var readyX = document.getElementById("ReadyX");
                    readyO.disabled = false;
                    readyX.disabled = false;
                    readyO.style.opacity = 1;
                    readyX.style.opacity = 1;
                }
                // change word depen to Turn
                if(roomList[room]?.Turn == roomList[room]?.playerX?.role && roomList[room]?.GameStart == true){
                    var textx = document.getElementById("TextX");
                    textx.innerText = "Your Turn!";
                    var texto = document.getElementById("TextO");
                    texto.innerText = "Waiting...";
                }else if(roomList[room]?.Turn == roomList[room]?.playerO?.role && roomList[room]?.GameStart == true){
                    var textx = document.getElementById("TextX");
                    textx.innerText = "Waiting...";
                    var texto = document.getElementById("TextO");
                    texto.innerText = "Your Turn!";
                }

                //update win and tie
                if(roomList[room]?.win == true){
                    win = true;
                }else{
                    win = false;
                }

                if(roomList[room]?.tie == true){
                    tie = true;
                }else{
                    tie = false;
                }

                //check giveup
                // if(roomList[room]?.playerX.xGiveup == true){
                //     update(ref(db, "playerRoom/" + room), {
                //         winner: "O",
                //         win: true,
                //     })
                // }
                // if(roomList[room]?.playerO.oGiveup == true){
                //     update(ref(db, "playerRoom/" + room), {
                //         winner: "X",
                //         win: true,
                //     })
                // }

                //update startbtn
                if(roomList[room]?.GameStart == true){
                    var startbtn = document.getElementById("startbtn");
                    startbtn.innerText = "END GAME";
                }else{
                    var startbtn = document.getElementById("startbtn");
                    startbtn.innerText = "Start";

                }

                // if(roomList[room]?.win == true){
                //     clearInterval(startTimer);
                //     clearInterval(countdown);
                //     console.log("in this");
                // }



                //Show Question
                if(roomList[room]?.win == false && roomList[room]?.tie == false && roomList[room]?.Turn == "X" && roomList[room]?.GameStart == true
                    && roomList[room]?.playerX.xGiveup == false && roomList[room]?.playerO.oGiveup == false){
                    if(currentUser?.uid === roomList[room]?.playerX?.uid){
                        setShowModal(true);
                        setTimeout(() => {
                            SetQuestion();
                            timebreak = false;
                        }, 1);
                    }
                }else if(roomList[room]?.win == false && roomList[room]?.tie == false && roomList[room]?.Turn == "O" && roomList[room]?.GameStart == true
                    && roomList[room]?.playerX.xGiveup == false && roomList[room]?.playerO.oGiveup == false){
                    if(currentUser?.uid === roomList[room]?.playerO?.uid){
                        setShowModal(true);
                        setTimeout(() => {
                            SetQuestion();
                            timebreak = false;
                        }, 1);
                    }
                }


            }
        })
    }, [roomList])

    // Update board
    useEffect(() => {
        Object.keys(roomList).map((room) => {
            if(params["*"] === roomList[room]?.roomId){
                //update X
                if(roomList[room]?.board[0][0] == "X"){
                    let div = document.getElementById("1-1");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[0][1] == "X"){
                    let div = document.getElementById("1-2");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[0][2] == "X"){
                    let div = document.getElementById("1-3");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[0][3] == "X"){
                    let div = document.getElementById("1-4");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[0][4] == "X"){
                    let div = document.getElementById("1-5");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[1][0] == "X"){
                    let div = document.getElementById("2-1");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[1][1] == "X"){
                    let div = document.getElementById("2-2");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[1][2] == "X"){
                    let div = document.getElementById("2-3");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[1][3] == "X"){
                    let div = document.getElementById("2-4");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[1][4] == "X"){
                    let div = document.getElementById("2-5");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[2][0] == "X"){
                    let div = document.getElementById("3-1");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[2][1] == "X"){
                    let div = document.getElementById("3-2");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[2][2] == "X"){
                    let div = document.getElementById("3-3");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[2][3] == "X"){
                    let div = document.getElementById("3-4");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[2][4] == "X"){
                    let div = document.getElementById("3-5");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[3][0] == "X"){
                    let div = document.getElementById("4-1");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[3][1] == "X"){
                    let div = document.getElementById("4-2");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[3][2] == "X"){
                    let div = document.getElementById("4-3");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[3][3] == "X"){
                    let div = document.getElementById("4-4");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[3][4] == "X"){
                    let div = document.getElementById("4-5");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[4][0] == "X"){
                    let div = document.getElementById("5-1");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[4][1] == "X"){
                    let div = document.getElementById("5-2");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[4][2] == "X"){
                    let div = document.getElementById("5-3");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[4][3] == "X"){
                    let div = document.getElementById("5-4");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                if(roomList[room]?.board[4][4] == "X"){
                    let div = document.getElementById("5-5");
                    div.innerHTML = `<img src="${Ximg}"></img>`;
                }
                //update O
                if(roomList[room]?.board[0][0] == "O"){
                    let div = document.getElementById("1-1");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[0][1] == "O"){
                    let div = document.getElementById("1-2");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[0][2] == "O"){
                    let div = document.getElementById("1-3");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[0][3] == "O"){
                    let div = document.getElementById("1-4");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[0][4] == "O"){
                    let div = document.getElementById("1-5");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[1][0] == "O"){
                    let div = document.getElementById("2-1");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[1][1] == "O"){
                    let div = document.getElementById("2-2");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[1][2] == "O"){
                    let div = document.getElementById("2-3");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[1][3] == "O"){
                    let div = document.getElementById("2-4");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[1][4] == "O"){
                    let div = document.getElementById("2-5");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[2][0] == "O"){
                    let div = document.getElementById("3-1");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[2][1] == "O"){
                    let div = document.getElementById("3-2");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[2][2] == "O"){
                    let div = document.getElementById("3-3");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[2][3] == "O"){
                    let div = document.getElementById("3-4");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[2][4] == "O"){
                    let div = document.getElementById("3-5");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[3][0] == "O"){
                    let div = document.getElementById("4-1");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[3][1] == "O"){
                    let div = document.getElementById("4-2");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[3][2] == "O"){
                    let div = document.getElementById("4-3");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[3][3] == "O"){
                    let div = document.getElementById("4-4");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[3][4] == "O"){
                    let div = document.getElementById("4-5");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[4][0] == "O"){
                    let div = document.getElementById("5-1");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[4][1] == "O"){
                    let div = document.getElementById("5-2");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[4][2] == "O"){
                    let div = document.getElementById("5-3");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[4][3] == "O"){
                    let div = document.getElementById("5-4");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }
                if(roomList[room]?.board[4][4] == "O"){
                    let div = document.getElementById("5-5");
                    div.innerHTML = `<img src="${Oimg}"></img>`;
                }


                //update null
                if(roomList[room]?.board[0][0] == " "){
                    let div = document.getElementById("1-1");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[0][1] == " "){
                    let div = document.getElementById("1-2");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[0][2] == " "){
                    let div = document.getElementById("1-3");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[0][3] == " "){
                    let div = document.getElementById("1-4");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[0][4] == " "){
                    let div = document.getElementById("1-5");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[1][0] == " "){
                    let div = document.getElementById("2-1");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[1][1] == " "){
                    let div = document.getElementById("2-2");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[1][2] == " "){
                    let div = document.getElementById("2-3");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[1][3] == " "){
                    let div = document.getElementById("2-4");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[1][4] == " "){
                    let div = document.getElementById("2-5");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[2][0] == " "){
                    let div = document.getElementById("3-1");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[2][1] == " "){
                    let div = document.getElementById("3-2");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[2][2] == " "){
                    let div = document.getElementById("3-3");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[2][3] == " "){
                    let div = document.getElementById("3-4");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[2][4] == " "){
                    let div = document.getElementById("3-5");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[3][0] == " "){
                    let div = document.getElementById("4-1");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[3][1] == " "){
                    let div = document.getElementById("4-2");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[3][2] == " "){
                    let div = document.getElementById("4-3");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[3][3] == " "){
                    let div = document.getElementById("4-4");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[3][4] == " "){
                    let div = document.getElementById("4-5");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[4][0] == " "){
                    let div = document.getElementById("5-1");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[4][1] == " "){
                    let div = document.getElementById("5-2");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[4][2] == " "){
                    let div = document.getElementById("5-3");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[4][3] == " "){
                    let div = document.getElementById("5-4");
                    div.innerHTML = "";
                }
                if(roomList[room]?.board[4][4] == " "){
                    let div = document.getElementById("5-5");
                    div.innerHTML = "";
                }

                //update win

                if(roomList[room]?.win == true && roomList[room]?.winner == "X"){
                    var divwin = document.getElementById("winner");
                    divwin.innerHTML = "THE WINNER IS:" + `<img src="${Ximg}"></img>`;
                    try{
                        Object.keys(usersList).map((user) => {
                            update(ref(db, "usersList/" + roomList[room].playerX.uid), {
                                score: usersList[roomList[room].playerX?.uid].score + 100,
                                win: usersList[roomList[room].playerX?.uid].win + 1,
                            })
                        })
                    } catch (e) {
                        console.log(e.message)
                    }
                    
                }
                if(roomList[room]?.win == true && roomList[room]?.winner == "O"){
                    var divwin = document.getElementById("winner");
                    divwin.innerHTML = "THE WINNER IS:" + `<img src="${Oimg}"></img>`;
                    try{
                        Object.keys(usersList).map((user) => {
                            update(ref(db, "usersList/" + roomList[room].playerO.uid), {
                                score: usersList[roomList[room].playerO.uid].score + 100,
                                win: usersList[roomList[room].playerX?.uid].win + 1,
                            })
                        })
                    } catch (e) {
                        console.log(e.message);
                    }
                    
                }
                if(roomList[room]?.win == false && roomList[room]?.tie == false){
                    var divwin = document.getElementById("winner");
                    divwin.innerHTML = "";
                }
                if(roomList[room]?.tie == true){
                    var divwin = document.getElementById("winner");
                    divwin.innerHTML = "THE WINNER IS:" + `<img src="${Tieimg}"></img>`;
                }




            }
        })
    }, [roomList])

    //Set Question
    function SetQuestion(){
        const Qarray = QA[Math.floor(Math.random() * 45)]
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

    //Check Question
    function CheckQuestion(button){
        console.log(button);
        if (onevent == false){
            click = true;
            console.log(TrueAns + " " + button);
            if (TrueAns == button){
                timebreak = true;
                console.log("True");
                var truebtn = document.getElementById(`${TrueAns}`);
                truebtn.style.backgroundColor = "limegreen";
                console.log("set style");
                TimeMark();
                setTimeout(() => {
                    setShowModal(false);
                    click = false;
                }, 1000);

            } else {
                var truebtn = document.getElementById(`${TrueAns}`);
                truebtn.style.backgroundColor = "limegreen";
                if(button != "nah"){
                    var falsebtn = document.getElementById(`${button}`);
                    falsebtn.style.backgroundColor = "red";
                }
                setTimeout(() => {
                    setShowModal(false);
                    click = false;
                    Object.keys(roomList).map((room) => {
                        if(params["*"] === roomList[room]?.roomId){
                            if(roomList[room]?.Turn == "X"){
                                update(ref(db, "playerRoom/" + room), {
                                    Turn: "O",
                                })
                            }else if(roomList[room]?.Turn == "O"){
                                update(ref(db, "playerRoom/" + room), {
                                    Turn: "X",
                                })
                            }
                        }
    
                    })
                }, 1000);
                
                
                



            }
        }
    }


    //check time remain for mark
    function TimeMark(){
        var divtime = document.getElementById("playertimeX");
        var timeremain = 10;
        divtime.innerText = timeremain;
        divtime = document.getElementById("playertimeO");
        divtime.innerText = timeremain;
        var countdown = setInterval(minustime, 1000);
        console.log("in timemark");
        function minustime(){
            if(timeremain > 0){
                timeremain--;
                var divtime = document.getElementById("playertimeX");
                divtime.innerText = timeremain;
                divtime = document.getElementById("playertimeO");
                divtime.innerText = timeremain;
                console.log("in minus time");
            }
            else{
                clearInterval(countdown);
                var divtime = document.getElementById("playertimeX");
                divtime.innerText = "TIME";
                divtime = document.getElementById("playertimeO");
                divtime.innerText = "TIME";
                console.log("inelse");
                Object.keys(roomList).map((room) => {
                    if(params["*"] === roomList[room]?.roomId){
                        if(roomList[room]?.Turn == "X"){
                            update(ref(db, "playerRoom/" + room), {
                                Turn: "O",
                            })
                        }else if(roomList[room]?.Turn == "O"){
                            update(ref(db, "playerRoom/" + room), {
                                Turn: "X",
                            })
                        }
                    }

                })
                timebreak = false;

            }
            if(clickmark == true){
                var divtime = document.getElementById("playertimeX");
                divtime.innerText = "TIME";
                divtime = document.getElementById("playertimeO");
                divtime.innerText = "TIME";
                clearInterval(countdown);
                clickmark = false;
                console.log("inclick");
            }
        }
    }

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
            if(params["*"] === roomList[room]?.roomId) {
                if(currentUser?.uid === roomList[room]?.playerX?.uid){
                    if(button === roomList[room]?.playerX?.role){
                        if(roomList[room]?.playerX?.xGiveup == false){
                            update(ref(db, "playerRoom/" + room + "/playerX"), {
                                xGiveup: true,
                            })
                            update(ref(db, "playerRoom/" + room), {
                                winner: "O",
                                win: true,
                            })
                            console.log("xGiveUp");
                        }
                    }
                }else if(currentUser?.uid === roomList[room]?.playerO?.uid){
                    if(button === roomList[room]?.playerO?.role){
                        if(roomList[room]?.playerO?.oGiveup == false){
                            update(ref(db, "playerRoom/" + room + "/playerO"), {
                                oGiveup: true,
                            })
                            update(ref(db, "playerRoom/" + room), {
                                winner: "X",
                                win: true,
                            })
                            console.log("oGiveUp");
                        }
                    }
                }

            }
        })
    }

    //Reset board
    function ResetBoard(){
        Object.keys(roomList).map((room) => {
            if(params["*"] === roomList[room]?.roomId) {

                if(roomList[room]?.GameStart == false & roomList[room]?.playerX.readyStatus == true && roomList[room]?.playerO.readyStatus == true){
                    update(ref(db, "playerRoom/" + room), {
                        board: [[" ", " ", " ", " ", " "],[" ", " ", " ", " ", " "],[" ", " ", " ", " ", " "],[" ", " ", " ", " ", " "],[" ", " ", " ", " ", " "]],
                        win: false,
                        winner: " ",
                        tie: false,
                        Turn: "X",
                        GameStart: true,
                    })


                }else if(roomList[room]?.GameStart == true && (roomList[room]?.win == true || roomList[room]?.tie == true)){

                    update(ref(db, "playerRoom/" + room), {
                        board: [[" ", " ", " ", " ", " "],[" ", " ", " ", " ", " "],[" ", " ", " ", " ", " "],[" ", " ", " ", " ", " "],[" ", " ", " ", " ", " "]],
                        win: false,
                        winner: " ",
                        tie: false,
                        Turn: "X",
                        GameStart: false,
                    })
                    update(ref(db, "playerRoom/" + room + "/playerX"), {
                        readyStatus: false,
                        xGiveup: false,
                        xPlay: "",
                    })
                    update(ref(db, "playerRoom/" + room + "/playerO"), {
                        readyStatus: false,
                        oGiveup: false,
                        pPlay: "",
                    })


                }


            }
        })
    }

    //qte check
    function clickforqte(){
        clickqte = true;
    }

    //time for ans ques
    function initBarCount(){
        var alreadyhelp = false;
        var divTimeLeft = document.getElementById("TimeLeft");
        var divCountdownBar = document.getElementById("Countdownbar");
        var startTimer = setInterval(barCount, 30);
        var countp = 0.00;
        function barCount(){
            Object.keys(roomList).map((room) => {
                if(params["*"] === roomList[room]?.roomId){
                    if(click == true || roomList[room]?.win == true){
                        clearInterval(startTimer);
                        timebreak = true;
                        console.log("TimeBreak");
                        // setTimeout(() => {
                        //     setShowModal(false);
                        // }, 1000);
                    }
                    if(divTimeLeft.clientWidth < divCountdownBar.clientWidth && onevent == false){
                        divTimeLeft.style.width = (countp + 0.2)+"%"
                        countp += 0.2;
                    }
                    else if(divTimeLeft.clientWidth == divCountdownBar.clientWidth && timebreak == false && click == false){
                        // divTimeLeft.style.width = divCountdownBar.clientWidth;
                        clearInterval(startTimer);
                        CheckQuestion("nah");
                    }
                    if(countp > 50 && alreadyhelp == false){
                        SetHelpBar();
                        alreadyhelp = true;
                    }
                }

            })

        }
    }

    //set up help bar
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
                onevent = false;
                console.log(isclicktimetrue);
                setTimeout(() => {
                    const quick = document.getElementById("quick");
                    const buttonqte = document.getElementById("buttonqte");
                    quick.hidden = true;
                    buttonqte.hidden = true;
                }, 1500);
            } else{
                percentNow += 0.1;
                const checkbar = document.getElementById("checkbar");
                checkbar.style.transform = `translateX(${(quick.clientWidth * percentNow) / 100}px)`;
            }
        }

    }


    //checkwin
    /// Santakorn change comparison ///
    function checkWinner(board) {
        // Check rows
        for (let i = 0; i < 5; i++) {
            if (board[i][0].innerHTML !== "" && board[i][0].innerHTML === board[i][1].innerHTML && board[i][1].innerHTML === board[i][2].innerHTML && board[i][2].innerHTML === board[i][3].innerHTML && board[i][3].innerHTML === board[i][4].innerHTML) {
                console.log(board[i][0].innerHTML);
                win = true;
                winner = board[i][0].innerHTML;
                console.log("Win row");
                console.log(winner);
                Object.keys(roomList).map((room) => {
                    if (params["*"] === roomList[room]?.roomId) {
                        if (board[i][0].innerHTML == `<img src="/src/img/X.png">`) {
                            update(ref(db, "playerRoom/" + room), {
                                winner: "X",
                                win: true,
                            })



                        } else if (board[i][0].innerHTML == `<img src="/src/img/O.png">`) {
                            update(ref(db, "playerRoom/" + room), {
                                winner: "O",
                                win: true,
                            })

                        }

                    }
                })
            }
        }


        // Check columns
        for (let i = 0; i < 5; i++) {
            if (board[0][i].innerHTML !== "" && board[0][i].innerHTML === board[1][i].innerHTML && board[1][i].innerHTML === board[2][i].innerHTML && board[2][i].innerHTML === board[3][i].innerHTML && board[3][i].innerHTML === board[4][i].innerHTML) {
                win = true;
                winner = board[0][i].innerHTML;
                console.log("Win col");
                console.log(winner);

                Object.keys(roomList).map((room) => {
                    if(params["*"] === roomList[room]?.roomId) {
                        if(board[0][i].innerHTML == `<img src="/src/img/X.png">`){
                            update(ref(db, "playerRoom/" + room), {
                                winner: "X",
                                win: true,
                            })
                        } else if(board[0][i].innerHTML == `<img src="/src/img/O.png">`){
                            update(ref(db, "playerRoom/" + room), {
                                winner: "O",
                                win: true,
                            })
                        }
                    }
                })
            }
        }

        // Check diagonals
        if (board[0][0].innerHTML !== "" && board[0][0].innerHTML === board[1][1].innerHTML && board[1][1].innerHTML === board[2][2].innerHTML && board[2][2].innerHTML === board[3][3].innerHTML && board[3][3].innerHTML === board[4][4].innerHTML) {
            win = true;
            winner = board[0][0].innerHTML;
            console.log("Win di");
            console.log(winner);

            Object.keys(roomList).map((room) => {
                if(params["*"] === roomList[room]?.roomId) {
                    if(board[0][0].innerHTML == `<img src="/src/img/X.png">`){
                        update(ref(db, "playerRoom/" + room), {
                            winner: "X",
                            win: true,
                        })
                    } else if(board[0][0].innerHTML == `<img src="/src/img/O.png">`){
                        update(ref(db, "playerRoom/" + room), {
                            winner: "O",
                            win: true,
                        })
                    }
                }
            })
        }

        if (board[0][4].innerHTML !== "" && board[0][4].innerHTML === board[1][3].innerHTML && board[1][3].innerHTML === board[2][2].innerHTML && board[2][2].innerHTML === board[3][1].innerHTML && board[3][1].innerHTML === board[4][0].innerHTML) {
            win = true;
            winner = board[0][4].innerHTML;
            console.log("Win di");
            console.log(winner);

            Object.keys(roomList).map((room) => {
                if(params["*"] === roomList[room]?.roomId) {
                    if(board[0][4].innerHTML == `<img src="/src/img/X.png">`){
                        update(ref(db, "playerRoom/" + room), {
                            winner: "X",
                            win: true,
                        })
                    } else if(board[0][4].innerHTML == `<img src="/src/img/O.png">`){
                        update(ref(db, "playerRoom/" + room), {
                            winner: "O",
                            win: true,
                        })
                    }
                }
            })
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

            Object.keys(roomList).map((room) => {
                if(params["*"] === roomList[room]?.roomId){
                    update(ref(db, "playerRoom/" + room), {
                        tie: true,
                    })
                }

            })


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


    //when player click board
    function clickCol(event) {
        // Object.keys(roomList).map((room) => {
        //     console.log(room);
        // })

        Object.keys(roomList).map((room) => {
            console.log(room);
            if(params["*"] === roomList[room]?.roomId) {

                if(currentUser?.uid === roomList[room]?.playerX?.uid && roomList[room]?.win == false && roomList[room]?.GameStart == true){
                    if(roomList[room]?.Turn == roomList[room]?.playerX?.role){
                        checkWinner(row);
                        console.log(event.currentTarget.id);
                        console.log(event.currentTarget.innerHTML);
                        if (win === false && tie === false && event.currentTarget.innerHTML === ""){
                            clickmark = true;
                            event.currentTarget.innerHTML = `<img src="${Ximg}"></img>`
                            checkWinner(row);
                            console.log(win);
                            update(ref(db, "playerRoom/" + room + "/playerX"), {
                                xPlay: event.currentTarget.id,
                            })

                            //บูทฟอร์สเหย๋ดเเหม่
                            if(event.currentTarget.id == "1-1"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/0"), {
                                    0: "X",
                                })
                            }
                            if(event.currentTarget.id == "1-2"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/0"), {
                                    1: "X",
                                })
                            }
                            if(event.currentTarget.id == "1-3"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/0"), {
                                    2: "X",
                                })
                            }
                            if(event.currentTarget.id == "1-4"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/0"), {
                                    3: "X",
                                })
                            }
                            if(event.currentTarget.id == "1-5"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/0"), {
                                    4: "X",
                                })
                            }
                            if(event.currentTarget.id == "2-1"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/1"), {
                                    0: "X",
                                })
                            }
                            if(event.currentTarget.id == "2-2"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/1"), {
                                    1: "X",
                                })
                            }
                            if(event.currentTarget.id == "2-3"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/1"), {
                                    2: "X",
                                })
                            }
                            if(event.currentTarget.id == "2-4"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/1"), {
                                    3: "X",
                                })
                            }
                            if(event.currentTarget.id == "2-5"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/1"), {
                                    4: "X",
                                })
                            }
                            if(event.currentTarget.id == "3-1"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/2"), {
                                    0: "X",
                                })
                            }
                            if(event.currentTarget.id == "3-2"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/2"), {
                                    1: "X",
                                })
                            }
                            if(event.currentTarget.id == "3-3"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/2"), {
                                    2: "X",
                                })
                            }
                            if(event.currentTarget.id == "3-4"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/2"), {
                                    3: "X",
                                })
                            }
                            if(event.currentTarget.id == "3-5"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/2"), {
                                    4: "X",
                                })
                            }
                            if(event.currentTarget.id == "4-1"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/3"), {
                                    0: "X",
                                })
                            }
                            if(event.currentTarget.id == "4-2"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/3"), {
                                    1: "X",
                                })
                            }
                            if(event.currentTarget.id == "4-3"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/3"), {
                                    2: "X",
                                })
                            }
                            if(event.currentTarget.id == "4-4"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/3"), {
                                    3: "X",
                                })
                            }
                            if(event.currentTarget.id == "4-5"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/3"), {
                                    4: "X",
                                })
                            }
                            if(event.currentTarget.id == "5-1"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/4"), {
                                    0: "X",
                                })
                            }
                            if(event.currentTarget.id == "5-2"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/4"), {
                                    1: "X",
                                })
                            }
                            if(event.currentTarget.id == "5-3"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/4"), {
                                    2: "X",
                                })
                            }
                            if(event.currentTarget.id == "5-4"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/4"), {
                                    3: "X",
                                })
                            }
                            if(event.currentTarget.id == "5-5"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/4"), {
                                    4: "X",
                                })
                            }


                            if(win == false && tie == false){
                                update(ref(db, "playerRoom/" + room), {
                                    Turn: "O",
                                })
                            }

                        } else if(win == true){
                            // ReadyPlayerReset();
                        }
                    }
                }else if(currentUser?.uid === roomList[room]?.playerO?.uid && roomList[room]?.win == false){
                    if(roomList[room]?.Turn == roomList[room]?.playerO?.role){
                        checkWinner(row);
                        console.log(event.currentTarget);
                        console.log(event.currentTarget.innerHTML);
                        if (win === false && tie === false && event.currentTarget.innerHTML === ""){
                            clickmark = true;
                            event.currentTarget.innerHTML = `<img src="${Oimg}"></img>`
                            checkWinner(row);
                            console.log(win);

                            update(ref(db, "playerRoom/" + room + "/playerO"), {
                                oPlay: event.currentTarget.id,
                            })

                            //บูทฟอร์สเหย๋ดเเหม่
                            if(event.currentTarget.id == "1-1"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/0"), {
                                    0: "O",
                                })
                            }
                            if(event.currentTarget.id == "1-2"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/0"), {
                                    1: "O",
                                })
                            }
                            if(event.currentTarget.id == "1-3"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/0"), {
                                    2: "O",
                                })
                            }
                            if(event.currentTarget.id == "1-4"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/0"), {
                                    3: "O",
                                })
                            }
                            if(event.currentTarget.id == "1-5"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/0"), {
                                    4: "O",
                                })
                            }
                            if(event.currentTarget.id == "2-1"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/1"), {
                                    0: "O",
                                })
                            }
                            if(event.currentTarget.id == "2-2"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/1"), {
                                    1: "O",
                                })
                            }
                            if(event.currentTarget.id == "2-3"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/1"), {
                                    2: "O",
                                })
                            }
                            if(event.currentTarget.id == "2-4"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/1"), {
                                    3: "O",
                                })
                            }
                            if(event.currentTarget.id == "2-5"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/1"), {
                                    4: "O",
                                })
                            }
                            if(event.currentTarget.id == "3-1"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/2"), {
                                    0: "O",
                                })
                            }
                            if(event.currentTarget.id == "3-2"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/2"), {
                                    1: "O",
                                })
                            }
                            if(event.currentTarget.id == "3-3"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/2"), {
                                    2: "O",
                                })
                            }
                            if(event.currentTarget.id == "3-4"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/2"), {
                                    3: "O",
                                })
                            }
                            if(event.currentTarget.id == "3-5"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/2"), {
                                    4: "O",
                                })
                            }
                            if(event.currentTarget.id == "4-1"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/3"), {
                                    0: "O",
                                })
                            }
                            if(event.currentTarget.id == "4-2"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/3"), {
                                    1: "O",
                                })
                            }
                            if(event.currentTarget.id == "4-3"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/3"), {
                                    2: "O",
                                })
                            }
                            if(event.currentTarget.id == "4-4"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/3"), {
                                    3: "O",
                                })
                            }
                            if(event.currentTarget.id == "4-5"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/3"), {
                                    4: "O",
                                })
                            }
                            if(event.currentTarget.id == "5-1"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/4"), {
                                    0: "O",
                                })
                            }
                            if(event.currentTarget.id == "5-2"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/4"), {
                                    1: "O",
                                })
                            }
                            if(event.currentTarget.id == "5-3"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/4"), {
                                    2: "O",
                                })
                            }
                            if(event.currentTarget.id == "5-4"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/4"), {
                                    3: "O",
                                })
                            }
                            if(event.currentTarget.id == "5-5"){
                                update(ref(db, "playerRoom/" + room + "/board" + "/4"), {
                                    4: "O",
                                })
                            }

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

            <div className="absolute bg-kiddoyellow w-2/12 py-8 left-0 bottom-0 rounded-r-3xl border-4 border-black text-black md:mb-[12vh] lg:mb-[13vh]">

                <div id="playertimeX" className="text-center text-4xl font-bold">TIME</div>

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

            <div className="absolute bg-kiddobrown w-2/12 py-8 right-0 bottom-0 rounded-l-3xl border-4 border-white text-white md:mb-[12vh] lg:mb-[13vh]">

                <div id="playertimeO" className="text-center text-4xl font-bold">TIME</div>

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
                <div className="absolute top-0 md:mt-[20vh] lg:mt-[12vh]">
                    <div className="relative bg-slate-200 rounded-3xl border-4 border-black p-2">

                        <div className="flex justify-center" id="row1">
                            <div onClick={clickCol} id="1-1" className="tdtd"></div>
                            <div onClick={clickCol} id="1-2" className="tdtd"></div>
                            <div onClick={clickCol} id="1-3" className="tdtd"></div>
                            <div onClick={clickCol} id="1-4" className="tdtd"></div>
                            <div onClick={clickCol} id="1-5" className="tdtd"></div>
                        </div>
                        <div className="flex justify-center" id="row2">
                            <div onClick={clickCol} id="2-1" className="tdtd"></div>
                            <div onClick={clickCol} id="2-2" className="tdtd"></div>
                            <div onClick={clickCol} id="2-3" className="tdtd"></div>
                            <div onClick={clickCol} id="2-4" className="tdtd"></div>
                            <div onClick={clickCol} id="2-5" className="tdtd"></div>
                        </div>
                        <div className="flex justify-center" id="row3">
                            <div onClick={clickCol} id="3-1" className="tdtd"></div>
                            <div onClick={clickCol} id="3-2" className="tdtd"></div>
                            <div onClick={clickCol} id="3-3" className="tdtd"></div>
                            <div onClick={clickCol} id="3-4" className="tdtd"></div>
                            <div onClick={clickCol} id="3-5" className="tdtd"></div>
                        </div>
                        <div className="flex justify-center" id="row4">
                            <div onClick={clickCol} id="4-1" className="tdtd"></div>
                            <div onClick={clickCol} id="4-2" className="tdtd"></div>
                            <div onClick={clickCol} id="4-3" className="tdtd"></div>
                            <div onClick={clickCol} id="4-4" className="tdtd"></div>
                            <div onClick={clickCol} id="4-5" className="tdtd"></div>
                        </div>
                        <div className="flex justify-center" id="row5">
                            <div onClick={clickCol} id="5-1" className="tdtd"></div>
                            <div onClick={clickCol} id="5-2" className="tdtd"></div>
                            <div onClick={clickCol} id="5-3" className="tdtd"></div>
                            <div onClick={clickCol} id="5-4" className="tdtd"></div>
                            <div onClick={clickCol} id="5-5" className="tdtd"></div>
                        </div>

                    </div>
                </div>
                <div id="winner" className="absolute text-center text-3xl text-white font-bold mt-[30vh]"></div>
            </div>

            <div className="flex items-center justify-center">
                <div className="absolute bottom-0 md:mb-[vh] lg:mb-[vh]">
                    <button id="startbtn" onClick={ResetBoard} className="rounded-2xl text-black bg-kiddoyellow px-8 py-4 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">START</button>
                </div>
            </div>

            {showModal ? (
                <>
                    <div className="flex flex-col justify-center items-center fixed inset-0 z-50">
                        <div className="relative w-auto max-w-2xl drop-shadow-kiddodropshadowtwo">
                            <div className="rounded-2xl shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                <div className="flex justify-center items-center p-6">

                                    <div id="Countdownbar" style={{position: "relative", height: "5vh", width: "50vw", border: "2px black solid", background: "linear-gradient(to right, #D14545, #FFD045)"}}>
                                        <div id="TimeLeft" style={{position: "relative", float: "right", background: "lightgray", height: "4.7vh", width: "0%"}}></div>
                                    </div>

                                </div>

                                <div className="flex justify-center items-center p-6 border-b">

                                    <h3 id="question" className="text-2xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quasi delectus deserunt.</h3>

                                </div>

                                <div className="flex items-center justify-center p-6 border-t">

                                    <button id="A" className="rounded-2xl text-black bg-kiddoyellow px-12 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                                            onClick={() => CheckQuestion("A")}>A) ...</button>

                                    <button id="B" className="rounded-2xl text-black bg-kiddoyellow px-12 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                                            onClick={() => CheckQuestion("B")}>B) ...</button>

                                </div>

                                <div className="flex items-center justify-center p-6">

                                    <button id="C" className="rounded-2xl text-black bg-kiddoyellow px-12 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                                            onClick={() => CheckQuestion("C")}>C) ...</button>

                                    <button id="D" className="rounded-2xl text-black bg-kiddoyellow px-12 py-2 text-2xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover mx-8" type="button"
                                            onClick={() => CheckQuestion("D")}>D) ...</button>

                                </div>
                            </div>
                        </div>
                        <div className="mt-6" hidden id="quick" style={{position: "relative", height: "5vh", width: "50vw", border: "2px black solid", background: "lightgray"}}>

                            <div id="truebar" style={{position: "relative", float: "right", background: "green", height: "4.7vh", width: "0%"}}></div>

                            <div id="checkbar" style={{position: "relative", float: "left", background: "red", height: "4.7vh", width: "1%"}}></div>

                        </div>
                        <div className="mt-6" hidden id="buttonqte">
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