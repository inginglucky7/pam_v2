import React from "react";
import "./Kiddo.css"

const howtoplaypage = () => {

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
                    <img className="w-80" src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383901690871838/How_to_play.png" draggable="false" />
                </div>

            </div>

            <div className="flex items-center justify-center pt-12">
                <div className="rounded-3xl bg-kiddoyellow shadow-lg drop-shadow-kiddodropshadow text-black md:w-7/12 lg:w-5/12 xl:w-3/12">
                    <h1 className="text-2xl font-bold text-center py-4">HOW TO PLAY</h1>
                    <hr className="w-80 h-1 mx-auto bg-kiddobrown border-0 rounded" />
                    <table className="w-full text-center">
                        <tbody>
                            <tr className="text-xl">
                                <td className="px-16 py-4">1. xxxxxxxxxxxxxxxxxx</td>
                            </tr>
                            <tr className="text-xl">
                                <td className="px-16 py-4">2. xxxxxxxxxxxxxxxxxx</td>
                            </tr>
                            <tr className="text-xl">
                                <td className="px-16 py-4">3. xxxxxxxxxxxxxxxxxx</td>
                            </tr>
                            <tr className="text-xl">
                                <td className="px-16 py-4">4. xxxxxxxxxxxxxxxxxx</td>
                            </tr>
                            <tr className="text-xl">
                                <td className="px-16 py-4">5. xxxxxxxxxxxxxxxxxx</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default howtoplaypage;