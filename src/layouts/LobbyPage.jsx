import React from "react";
import "./Kiddo.css"

const lobbypage = () => {

    return (
        
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">

            <div className="absolute text-2xl bottom-0 ml-6 mb-6">
                <button className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-6 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK</button>
            </div>
            
            <div className="flex items-center justify-center pt-12">

                <div className="rounded-3xl bg-black py-2 bg-opacity-80 backdrop-blur shadow-lg md:w-6/12 lg:w-4/12 xl:w-3/12">
                    <div className="flex items-center justify-center">
                        <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078961231815245824/Logo.png" className="kiddologo w-4/12" draggable="false" />
                        <div className="relative text-white ml-8">
                            <h1 className="mb-4 font-bold text-3xl">PAM's KIDDO</h1>
                            <h1 className="font-bold text-2xl">TIC TAC TOE</h1>
                        </div>
                    </div>
                </div>

                <div className="ml-16">
                    <img className="w-80" src="https://cdn.discordapp.com/attachments/981506950569275482/1094580844221448303/Lobby.png" draggable="false" />
                </div>

            </div>

            <div className="flex items-center justify-center pt-24">

                <div className="rounded-3xl bg-kiddoyellow shadow-lg drop-shadow-kiddodropshadow mr-24 ml-2 md:w-5/12 lg:w-4/12 xl:w-3/12">
                    <div className="text-black">
                        <h1 className="text-4xl font-bold text-center py-10">VS BOT</h1>
                        <hr className="w-60 h-1 mx-auto bg-kiddobrown border-0 rounded" />
                    </div>
                    <div className="flex justify-center items-center py-20">
                        <button className="rounded-2xl bg-white bg-opacity-90 px-16 py-8 text-black text-3xl font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-slate-200">START</button>
                    </div>
                </div>

                <div className="rounded-3xl bg-kiddobrown shadow-lg drop-shadow-kiddodropshadowtwo ml-24 mr-2 md:w-5/12 lg:w-4/12 xl:w-3/12">
                    <div className="text-white">
                        <h1 className="text-4xl font-bold text-center py-10">VS PLAYER</h1>
                        <hr className="w-60 h-1 mx-auto bg-kiddoyellow border-0 rounded" />
                    </div>
                    <div className="flex justify-center items-center py-20">
                        <button className="rounded-2xl bg-white bg-opacity-90 px-16 py-8 text-black text-3xl font-bold shadow-xl drop-shadow-kiddodropshadowtwo duration-200 hover:bg-slate-200">JOIN</button>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default lobbypage;