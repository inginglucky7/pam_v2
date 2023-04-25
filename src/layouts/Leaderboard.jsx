import React from "react";
import "./Kiddo.css"
import {useNavigate} from "react-router-dom";

const leaderboard = () => {
    const navigate = useNavigate();
    return (
        
        <div className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">
            
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
                    <img className="w-80" src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383901892194364/Leaderboard.png" draggable="false" />
                </div>

            </div>

            <div className="flex items-center justify-center pt-8">

                <div className="relative overflow-x-auto rounded-3xl shadow-lg bg-kiddoyellow drop-shadow-kiddodropshadow md:w-11/12 lg:w-7/12 xl:w-5/12">
                    <h1 className="text-2xl font-bold text-center py-4">LEADERBOARD</h1>
                    <hr className="w-80 h-1 mx-auto bg-kiddobrown border-0 rounded" />
                    <table className="w-full text-center">
                        <thead className="bg-kiddoyellow uppercase text-black">
                            <tr>
                                <th scope="col" className="px-12 py-4">Ranking</th>
                                <th scope="col" className="px-12 py-4">Username</th>
                                <th scope="col" className="px-16 py-4">E-Mail</th>
                                <th scope="col" className="px-12 py-4">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-kiddolightyellow">
                                <th scope="row" className="py-3">1</th>
                                <th className="py-3">PAUL</th>
                                <td className="py-3">63070002@it.kmitl.ac.th</td>
                                <td className="py-3">1000</td>
                            </tr>
                            <tr className="bg-kiddoyellow">
                                <th scope="row" className="py-3">2</th>
                                <th className="py-3">PAUL</th>
                                <td className="py-3">63070002@it.kmitl.ac.th</td>
                                <td className="py-3">1000</td>
                            </tr>
                            <tr className="bg-kiddolightyellow">
                                <th scope="row" className="py-3">3</th>
                                <th className="py-3">PAUL</th>
                                <td className="py-3">63070002@it.kmitl.ac.th</td>
                                <td className="py-3">1000</td>
                            </tr>
                            <tr className="bg-kiddoyellow">
                                <th scope="row" className="py-3">4</th>
                                <th className="py-3">PAUL</th>
                                <td className="py-3">63070002@it.kmitl.ac.th</td>
                                <td className="py-3">1000</td>
                            </tr>
                            <tr className="bg-kiddolightyellow">
                                <th scope="row" className="py-3">5</th>
                                <th className="py-3">PAUL</th>
                                <td className="py-3">63070002@it.kmitl.ac.th</td>
                                <td className="py-3">1000</td>
                            </tr>
                            <tr className="bg-kiddoyellow">
                                <th scope="row" className="py-3">6</th>
                                <th className="py-3">PAUL</th>
                                <td className="py-3">63070002@it.kmitl.ac.th</td>
                                <td className="py-3">1000</td>
                            </tr>
                            <tr className="bg-kiddolightyellow">
                                <th scope="row" className="py-3">7</th>
                                <th className="py-3">PAUL</th>
                                <td className="py-3">63070002@it.kmitl.ac.th</td>
                                <td className="py-3">1000</td>
                            </tr>
                            <tr className="bg-kiddoyellow">
                                <th scope="row" className="py-3">8</th>
                                <th className="py-3">PAUL</th>
                                <td className="py-3">63070002@it.kmitl.ac.th</td>
                                <td className="py-3">1000</td>
                            </tr>
                            <tr className="bg-kiddolightyellow">
                                <th scope="row" className="py-3">9</th>
                                <th className="py-3">PAUL</th>
                                <td className="py-3">63070002@it.kmitl.ac.th</td>
                                <td className="py-3">1000</td>
                            </tr>
                            <tr className="bg-kiddoyellow">
                                <th scope="row" className="py-3">10</th>
                                <th className="py-3">PAUL</th>
                                <td className="py-3">63070002@it.kmitl.ac.th</td>
                                <td className="py-3">1000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div className="absolute text-2xl bottom-0 ml-6 mb-6">
                <button onClick={(e) => {
                    navigate(-1);
                }} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-6 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK</button>
            </div>

        </div>

    )
}

export default leaderboard;