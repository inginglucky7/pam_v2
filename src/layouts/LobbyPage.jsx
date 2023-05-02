import React, {useEffect, useState} from "react";
import "./Kiddo.css"
import {useNavigate, useLocation} from "react-router-dom";
import {db} from "../firebase-config.jsx";
import {ref, set, onValue, update, get, remove, push} from "firebase/database";
import {useAuth} from "../contexts/AuthContext.jsx";

const lobbypage = () => {
    const navigate = useNavigate();
    const { currentUser, setUserName, userName, roomPlayerRef, roomBotRef, createPlayerRoom, createBotRoom, roomIdPath, setRoomIdPath} = useAuth();
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        const gameRoomsRef = ref(db, 'playerRoom');
        onValue(gameRoomsRef, (snapshot) => {
            const gameRooms = snapshot.val();
            setRoomList(gameRooms);
        })
    }, [])

    const handleCreateBotRoom = async (user, email) => {
        try {
            await createBotRoom(user, email);
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleCreatePlayerRoom = async (user, userUid) => {
        try {
            const roomId = await createPlayerRoom(user, userUid);
            console.log(roomId);
            navigate(`/gamewithplayer/${roomId}`, {
                state: {
                    roomJoinUrl: location.pathname // /lobby,
                }
            });
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const handleBrowseRoom = () => {
        if(location?.state?.previousUrl === undefined){
            navigate("/browsegame", {
                state: {
                    previousUrl: location.pathname
                }
            })
        }
    }

    return (
        
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">

            <div className="absolute text-2xl bottom-0 ml-6 mb-6">
                <button onClick={(e) => {
                    e.preventDefault();
                    navigate("/mainmenu");
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
                    <img className="w-80" src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383902164811776/Lobby.png" draggable="false" />
                </div>

            </div>

            <div className="flex items-center justify-center pt-24">

                <div className="rounded-3xl bg-kiddoyellow shadow-lg drop-shadow-kiddodropshadow mr-24 ml-2 md:w-5/12 lg:w-4/12 xl:w-3/12">
                    <div className="text-black">
                        <h1 className="text-4xl font-bold text-center py-10">VS BOT</h1>
                        <hr className="w-60 h-1 mx-auto bg-kiddobrown border-0 rounded" />
                    </div>
                    <div className="flex justify-center items-center py-20">
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleCreateBotRoom(userName.name, userName.email);
                            navigate("/game")
                        }} className="rounded-2xl bg-white bg-opacity-90 px-16 py-8 text-black text-3xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-slate-200">START</button>
                    </div>
                </div>

                <div className="rounded-3xl bg-kiddobrown shadow-lg drop-shadow-kiddodropshadowtwo ml-24 mr-2 md:w-5/12 lg:w-4/12 xl:w-3/12">
                    <div className="text-white">
                        <h1 className="text-4xl font-bold text-center py-10">VS PLAYER</h1>
                        <hr className="w-60 h-1 mx-auto bg-kiddoyellow border-0 rounded" />
                    </div>
                    <div className="flex justify-center items-center py-8">
                        <button key={roomIdPath} onClick={(e) => {
                            handleCreatePlayerRoom(userName.name, currentUser.uid);
                        }} className="rounded-2xl bg-white bg-opacity-90 px-16 py-8 text-black text-3xl font-bold shadow-xl drop-shadow-kiddodropshadowtwo duration-200 hover:bg-slate-200">CREATE</button>
                    </div>
                    <div className="flex justify-center items-center py-8">
                        <button onClick={handleBrowseRoom} className="rounded-2xl bg-white bg-opacity-90 px-16 py-8 text-black text-3xl font-bold shadow-xl drop-shadow-kiddodropshadowtwo duration-200 hover:bg-slate-200">BROWSE</button>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default lobbypage;