import React from "react";
import "./Kiddo.css"
import {Link, NavLink, useNavigation, Outlet} from "react-router-dom";

const loginpage = () => {
    return (
        <div className="bg-kiddobg w-screen h-screen bg-center relative">

            <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078956356566007868/BG1.png"
            className="w-full h-full absolute opacity-10" draggable="false" />

            <div className="flex justify-center">
                <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078961231815245824/Logo.png" 
                className="kiddologologin absolute w-2/12" draggable="false" />
                
                <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078970065866727444/Name.png" 
                className="absolute w-2/12 mt-[17%]" draggable="false" />
            </div>

            <div className="flex justify-center">
                <form className="absolute mt-[27%]">
                    <label>
                        <input className="outline-transparent text-xl block w-[500px] p-4 rounded-t-3xl border-8 border-kiddoyellow drop-shadow-kiddodropshadow" type="text" placeholder="USERNAME" />
                    </label>
                    <br />
                    <label>
                        <input className="outline-transparent text-xl block w-[500px] p-4 rounded-t-3xl border-8 border-kiddoyellow drop-shadow-kiddodropshadow" type="text" placeholder="PASSWORD" />
                    </label>
                </form>
            </div>

            <div className="flex justify-center">
                <div className="absolute mt-[42%]">
                    <button className="font-bold text-5xl block w-[300px] h-[100px] rounded-t-3xl bg-kiddoyellow hover:bg-kiddoyellowhover mx-auto drop-shadow-kiddodropshadow">
                        <Link to="/tutorial">LOGIN</Link></button>
                    <br />
                    <button className="font-bold text-3xl block w-[400px] h-[75px] rounded-t-3xl bg-kiddoyellow hover:bg-kiddoyellowhover drop-shadow-kiddodropshadow"
                    ><Link to="/register">CREATE AN ACCOUNT</Link></button>
                </div>
            </div>

            <div className="absolute right-0 bottom-0 pb-8 pr-4">
                <p className="text-xl">©TEAM PAM 2023</p>
            </div>

            <Outlet/>
        </div>
    )
}

export default loginpage;