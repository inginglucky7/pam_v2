import React, {useEffect, useRef, useState} from "react";
import "./Kiddo.css"
import {useNavigate, useLocation, Link} from "react-router-dom";
import {onValue, ref, get, set} from "firebase/database";
import {db} from "../firebase-config.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";

const browsegame = () => {
    const navigate = useNavigate();
    const { currentUser, userName, roomNumber} = useAuth();
    const roomlistRef = useRef(null);
    const [roomList, setRoomList] = useState([]);
    const location = useLocation();
    const gameRoomsRef = ref(db, 'playerRoom');

    const handleJoinRoom = (roomId) => {
        navigate(`/gamewithplayer/${roomId}`, {
            state: {
                roomJoinUrl: roomId,
                from: "browsegame",
            }
        });
    }

    useEffect(() => {
        onValue(gameRoomsRef, (snapshot) => {
            const gameRooms = snapshot.val();
            setRoomList(gameRooms);
        });
    }, []);

    return (

        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">

            <div className="absolute text-2xl bottom-0 ml-6 mb-6">
                <button onClick={(e) => {
                    e.preventDefault();
                    navigate("/lobby");
                }} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-6 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK</button>
            </div>

            <div className="flex items-center justify-center pt-12">

                <div className="rounded-3xl bg-black py-2 bg-opacity-80 backdrop-blur shadow-lg md:w-6/12 lg:w-4/12 xl:w-3/12">
                    <div className="flex items-center justify-center">
                        <img src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383902408097862/Logo.png" className="kiddologo w-4/12" draggable="false" />
                        <div className="relative text-white ml-8">
                            <h1 className="mb-4 font-bold text-3xl">PAM's KIDDO</h1>
                            <h1 className="font-bold text-2xl">TIC TAC TOE</h1>
                        </div>
                    </div>
                </div>

                <div className="ml-16">
                    <img className="w-80" src="https://cdn.discordapp.com/attachments/1097383654050762762/1100099932259622992/Browse.png" draggable="false" />
                </div>

            </div>

            <div className="flex items-center justify-center pt-16">

                <div className="relative overflow-x-auto rounded-3xl shadow-lg bg-kiddoyellow drop-shadow-kiddodropshadow md:w-11/12 lg:w-7/12 xl:w-5/12">
                    <h1 className="text-2xl font-bold text-center py-4">BROWSE GAMES</h1>
                    <hr className="w-80 h-1 mx-auto bg-kiddobrown border-0 rounded" />
                    <table className="w-full text-center">
                        <thead className="bg-kiddoyellow uppercase text-black">
                            <tr>
                                <th scope="col" className="px-12 py-4">No.</th>
                                <th scope="col" className="px-12 py-4">Name</th>
                                <th scope="col" className="px-16 py-4">Status</th>
                                <th scope="col" className="px-12 py-4"></th>
                            </tr>
                        </thead>
                        <tbody ref={roomlistRef}>
                                {roomList === null ? <></> : Object.keys(roomList).map((room) => (
                                    <tr key={room}  className="bg-kiddolightyellow">
                                        <th scope="row" className="py-6">{parseInt(Object.keys(roomList).indexOf(room)) + 1}</th>
                                        {/*parseInt(room.indexOf(room))*/}
                                        <th className="">{roomList[room].roomName}</th>
                                        <th className="">{roomList[room]?.playerX?.name && roomList[room]?.playerO?.name === "" ? "1/2" : roomList[room]?.playerO?.name && roomList[room]?.playerX?.name === "" ? "1/2" :
                                            roomList[room]?.playerX?.name && roomList[room]?.playerO?.name ? "2/2" : ""
                                        }</th>
                                        <th id="${room[0]}-joinBtn" className="text-xl text-red-800">
                                            <button onClick={() => handleJoinRoom(roomList[room].roomId)}>JOIN</button>
                                        </th>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

    )
}

export default browsegame;