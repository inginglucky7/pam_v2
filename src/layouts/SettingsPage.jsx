import React from "react";
import "./Kiddo.css"

const settingspage = () => {

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
                    <img className="w-80" src="https://cdn.discordapp.com/attachments/981506950569275482/1094204134229544960/Setting.png" draggable="false" />
                </div>

            </div>

            <div className="flex items-center justify-center pt-24">
                <div className="rounded-3xl bg-kiddoyellow shadow-lg drop-shadow-kiddodropshadow text-black md:w-6/12 lg:w-4/12 xl:w-3/12">
                    <h1 className="text-2xl font-bold text-center py-4">SETTING</h1>
                    <hr className="w-40 h-1 mx-auto bg-kiddobrown border-0 rounded" />
                    <table className="w-full text-center">
                        <tbody>
                            <tr className="text-xl">
                                <th className="px-6 py-4">SFX</th>
                                <td className="px-12 py-4">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-6 h-6 border-2 accent-sky-200" />
                                </td>
                            </tr>
                            <tr className="text-xl">
                                <th className="px-6 py-4">MUSIC</th>
                                <td className="px-12 py-4">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-6 h-6 border-2 accent-sky-200" />
                                </td>
                            </tr>
                            <tr className="text-xl">
                                <th className="px-6 py-4">FULLSCREEN</th>
                                <td className="px-12 py-4">
                                    <input id="default-checkbox" type="checkbox" value="" className="w-6 h-6 border-2 accent-sky-200" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default settingspage;