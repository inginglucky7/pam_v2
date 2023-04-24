import React from "react";
import "./Kiddo.css"
import {useAuth} from "../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";


const profilepage = () => {
    const navigate = useNavigate();
    const {currentUser, userName, setUserName} = useAuth();
    return (
        
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">

            <div className="absolute text-2xl bottom-0 ml-6 mb-6">
                <button onClick={(e) => {
                    navigate("/mainmenu")
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
                    <img className="w-80" src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383902668140594/Profile.png" draggable="false" />
                </div>

            </div>

            <div className="flex items-center justify-center pt-12">
                <div className="rounded-3xl bg-black py-6 bg-opacity-80 backdrop-blur shadow-lg md:w-8/12 lg:w-6/12 xl:w-4/12">
                    <div className="flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white">
                            <img className="w-24 h-24 rounded-full" src={userName.photo} referrerPolicy="no-referrer"/>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white mx-4">
                            <h1 className="text-black font-bold text-xl">6</h1>
                        </div>
                        <div className="text-white">
                            <h1 className="mb-2 font-bold text-xl">{userName.name}</h1>
                            <h1 className="mb-2 font-bold text-xl">1000</h1>
                            <h1 className="text-md">{userName.email}</h1>
                        </div>
                        <div className="ml-12">
                            <img className="w-16 cursor-pointer" src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383901460168744/Edit0.png" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center pt-12">
                <div className="rounded-3xl bg-kiddoyellow shadow-lg drop-shadow-kiddodropshadow text-black md:w-7/12 lg:w-5/12 xl:w-3/12">
                    <h1 className="text-2xl font-bold text-center py-4">YOUR STATISTICS</h1>
                    <hr className="w-80 h-1 mx-auto bg-kiddobrown border-0 rounded" />
                    <table className="w-full text-center">
                        <tbody>
                            <tr className="text-xl">
                                <td className="px-16 py-4">Score</td>
                                <td className="px-16 py-4">X</td>
                            </tr>
                            <tr className="text-xl">
                                <td className="px-16 py-4">Score</td>
                                <td className="px-16 py-4">X</td>
                            </tr>
                            <tr className="text-xl">
                                <td className="px-16 py-4">Score</td>
                                <td className="px-16 py-4">X</td>
                            </tr>
                            <tr className="text-xl">
                                <td className="px-16 py-4">Score</td>
                                <td className="px-16 py-4">X</td>
                            </tr>
                            <tr className="text-xl">
                                <td className="px-16 py-4">Score</td>
                                <td className="px-16 py-4">X</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default profilepage;