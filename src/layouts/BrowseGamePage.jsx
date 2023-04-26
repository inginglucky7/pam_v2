import React from "react";
import "./Kiddo.css"

const browsegame = () => {

    return (
        
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">

            <div className="absolute text-2xl bottom-0 ml-6 mb-6">
                <button className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-6 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK</button>
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
                                <th scope="col" class="px-12 py-4">Room</th>
                                <th scope="col" class="px-12 py-4">Host</th>
                                <th scope="col" class="px-16 py-4">Status</th>
                                <th scope="col" class="px-12 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-kiddolightyellow">
                                <th scope="row" className="py-6">1</th>
                                <th className="">MEK</th>
                                <th className="">GAME HAS STARTED</th>
                                <th className="text-xl text-red-800 cursor-not-allowed">JOIN</th>
                            </tr>
                            <tr className="bg-kiddoyellow">
                                <th scope="row" className="py-6">2</th>
                                <th className="">ING</th>
                                <th className="">WAITING A PLAYER</th>
                                <th className="text-xl text-blue-800 cursor-pointer hover:underline">JOIN</th>
                            </tr>
                            <tr className="bg-kiddolightyellow">
                                <th scope="row" className="py-6">3</th>
                                <th className=""></th>
                                <th className=""></th>
                                <th className=""></th>
                            </tr>
                            <tr className="bg-kiddoyellow">
                                <th scope="row" className="py-6">4</th>
                                <th className=""></th>
                                <th className=""></th>
                                <th className=""></th>
                            </tr>
                            <tr className="bg-kiddolightyellow">
                                <th scope="row" className="py-6">5</th>
                                <th className=""></th>
                                <th className=""></th>
                                <th className=""></th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

    )
}

export default browsegame;