import React from "react";
import "./Kiddo.css"
import {useAuth} from "../contexts/AuthContext.jsx";
import {auth} from "../firebase-config.jsx";
import {useNavigate } from "react-router-dom";

const mainmenu = () => {
    const { currentUser, logOut, setUserLoggedIn, userName } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            if(currentUser != null){
                if(currentUser.isAnonymous){
                    auth.currentUser.delete();
                    console.log("Delete Complete")
                    await logOut();
                    setUserLoggedIn(false);
                } else{
                    await logOut();
                    setUserLoggedIn(false);
                }
            }
            console.log(auth?.currentUser?.email);
        } catch (e) {
            console.log(e.message)
        }
    }

    const handleProfile = (e) => {
        e.preventDefault();
        navigate("/profile")
    }

    const handleLeaderboard = (e) => {
        e.preventDefault();
        navigate("/leaderboard");
    }

    const handleTutorial = (e) => {
        e.preventDefault();
        navigate("/tutorial");
    }

    const handleSetting = (e) => {
        e.preventDefault();
        navigate("/setting");
    }

    const handleStartGame = (e) => {
        e.preventDefault();
        navigate("/lobby");
    }

    return (
        
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">

            <div className="grid grid-cols-2 h-screen w-full">

                <div className="flex items-center justify-center">
                    
                    <form action="#">

                        <div className="mb-10 flex justify-center text-2xl">
                            <button onClick={handleProfile} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-24 py-4 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">PROFILE</button>
                        </div>

                        <div className="mb-10 flex justify-center text-2xl">
                            <button onClick={handleLeaderboard} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-24 py-4 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">LEADERBOARD</button>
                        </div>

                        <div className="mb-10 flex justify-center text-2xl">
                            <button onClick={handleTutorial} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-24 py-4 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">HOW TO PLAY</button>
                        </div>

                        <div className="mb-20 flex justify-center text-2xl">
                            <button onClick={handleSetting} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-24 py-4 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">SETTING</button>
                        </div>

                        <div className="flex justify-center text-xl">
                            <button onClick={handleLogOut} className="rounded-2xl bg-kiddored bg-opacity-90 px-12 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropred duration-200 hover:bg-kiddoredhover">LOGOUT</button>
                        </div>

                    </form>

                </div>

                <div className="flex items-center">
                    
                    <div className="relative mx-auto">

                        <div className="rounded-3xl bg-black py-2 bg-opacity-80 backdrop-blur mb-20 mx-auto shadow-lg
                            md:w-11/12 lg:w-9/12 xl:w-7/12">
                            <div className="flex items-center justify-center">
                                <img src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383902408097862/Logo.png" className="kiddologo w-4/12" draggable="false" />
                                <div className="relative text-white ml-8">
                                    <h1 className="mb-4 font-bold text-3xl">PAM's KIDDO</h1>
                                    <h1 className="font-bold text-2xl">TIC TAC TOE</h1>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-black py-6 bg-opacity-80 backdrop-blur mb-20 mx-auto shadow-lg
                            md:w-11/12 lg:w-10/12 xl:w-8/12">
                            <div className="flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-white">
                                    <img className="w-24 h-24 rounded-full" src={userName?.photo} referrerPolicy="no-referrer"/>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white mx-4">
                                    <h1 className="text-black font-bold text-xl">6</h1>
                                </div>
                                <div className="text-white">
                                    <h1 className="mb-2 font-bold text-xl">{userName?.name}</h1>
                                    <h1 className="mb-2 font-bold text-xl">Point : 1000</h1>
                                    <h1 className="text-md">{userName?.email}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center text-3xl">
                            <button onClick={handleStartGame} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-12 py-8 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">START GAME</button>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default mainmenu;