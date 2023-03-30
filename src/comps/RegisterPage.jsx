import React from "react";
import "./Kiddo.css"

const registerpage = () => {
    return (
        <div className="bg-kiddobg w-screen h-screen bg-center relative">

            <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078956356566007868/BG1.png"
            className="w-full h-full absolute opacity-10" draggable="false" />

            <div className='grid grid-cols-2 grid-rows-1'>

                <div className="box">
                    <div className="flex justify-center ml-32">
                        <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078961231815245824/Logo.png" 
                        className="kiddologologin absolute w-2/12" draggable="false" />
                
                        <img src="https://cdn.discordapp.com/attachments/981506950569275482/1078970065866727444/Name.png" 
                        className="absolute w-2/12 mt-[17%]" draggable="false" />
                    </div>
                </div>

                <div className="box">
                    <div className="flex justify-center mt-28 mr-32">
                        <img src="https://cdn.discordapp.com/attachments/981506950569275482/1079061155823235183/Create_an_account.png" className="w-8/12" />
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <form className="absolute mt-28">
                    <label>
                        <input className="outline-transparent text-xl block w-[500px] p-4 rounded-t-3xl border-8 border-kiddoyellow drop-shadow-kiddodropshadow" type="text" placeholder="USERNAME" />
                    </label>
                    <br />
                    <label>
                        <input className="outline-transparent text-xl block w-[500px] p-4 rounded-t-3xl border-8 border-kiddoyellow drop-shadow-kiddodropshadow" type="text" placeholder="PASSWORD" />
                    </label>
                    <br />
                    <label>
                        <input className="outline-transparent text-xl block w-[500px] p-4 rounded-t-3xl border-8 border-kiddoyellow drop-shadow-kiddodropshadow" type="text" placeholder="CONFIRM PASSWORD" />
                    </label>
                </form>
            </div>

            <div className="flex justify-center">
                <div className="absolute mt-[24%]">
                    <button className="font-bold text-5xl block w-[300px] h-[100px] rounded-t-3xl bg-kiddoyellow hover:bg-kiddoyellowhover mx-auto drop-shadow-kiddodropshadow">REGISTER</button>
                </div>
            </div>

            <div className="absolute right-0 bottom-0 pb-8 pr-4">
                <p className="text-xl">©TEAM PAM 2023</p>
            </div>

            <div className="absolute left-0 top-0 pt-4 pl-4">
                <button className="font-bold text-4xl block w-[150px] h-[75px] rounded-t-3xl bg-kiddoyellow hover:bg-kiddoyellowhover mx-auto drop-shadow-kiddodropshadow">BACK</button>
            </div>

        </div>
    )
}

export default registerpage;