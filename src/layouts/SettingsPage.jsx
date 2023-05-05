import React, {useState, useRef} from "react";
import "./Kiddo.css"
import {useLocation, useNavigate} from "react-router-dom";

const settingspage = () => {
    const screenRef = useRef(null);
    const checkRef = useRef(null);
    const navigate = useNavigate()
    const handleFullScreen = (event) => {
        if(event.target.checked){
            if(screenRef.current.requestFullscreen){
                screenRef.current.requestFullscreen();
            }
        }
        else{
            if(document.exitFullscreen){
                document.exitFullscreen();
            }
        }
    }

    return (
        
        <div ref={screenRef} className="kiddobg h-screen w-full bg-kiddogray bg-cover bg-no-repeat">

            <div className="absolute text-2xl bottom-0 ml-6 mb-6">
                <button onClick={(e) => {
                    navigate(-1);
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
                    <img className="w-80" src="https://cdn.discordapp.com/attachments/1097383654050762762/1097383903318261880/Setting.png" draggable="false" />
                </div>

            </div>

            <div className="flex items-center justify-center pt-24">
                <div className="rounded-3xl bg-kiddoyellow shadow-lg drop-shadow-kiddodropshadow text-black md:w-6/12 lg:w-4/12 xl:w-3/12">
                    <h1 className="text-2xl font-bold text-center py-4">SETTING</h1>
                    <hr className="w-40 h-1 mx-auto bg-kiddobrown border-0 rounded" />
                    <table className="w-full text-center">
                        <tbody>
                            <tr className="text-xl">
                                <th className="px-6 py-4">FULLSCREEN</th>
                                <td className="px-12 py-4">
                                    <input onChange={(e) => {
                                        handleFullScreen(e);
                                    }
                                    } id="default-checkbox" type="checkbox" value="" className="w-6 h-6 border-2 accent-sky-200" />
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