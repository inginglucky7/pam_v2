import React, {useState} from "react";
import "./Kiddo.css"
import {auth} from "../firebase-config.jsx";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {useNavigation} from "react-router-dom";
const registerpage = () => {
    const [user, setUser] = useState({});
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [userConfirmPassword, setUserConfirmPassword] = useState(null);

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    let regiser = async () => {
        try {
            if(userConfirmPassword === userPassword && userPassword.length > 8){
                console.log(userEmail);
                const user = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
                setUser(auth);
                console.log(user);
            }
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <div>
                <div className="flex justify-center items-center bg-kiddogray w-screen h-screen">
                    <div className="grid grid-cols-2 bg-slate-50 w-[80%] h-[80%] rounded-3xl drop-shadow-2xl">
                        <div className="my-auto">
                            <img className="kiddologo w-6/12 h-6/12 mx-auto drop-shadow-md" src="https://cdn.discordapp.com/attachments/981506950569275482/1078961231815245824/Logo.png" draggable="false" />
                            <img className="w-6/12 h-6/12 mx-auto drop-shadow-md" src="https://cdn.discordapp.com/attachments/981506950569275482/1078970065866727444/Name.png" draggable="false" />
                        </div>
                        <div className="bg-slate-100 rounded-r-3xl w-full h-full">
                            <div>
                                <img className="xl:w-8/12 h-4/12 mx-auto drop-shadow-md mx-auto mt-[15%]
                                                lg:w-9/12 h-5/12 mx-auto drop-shadow-md mx-auto mt-[10%]
                                                md:w-11/12 h-7/12 mx-auto drop-shadow-md mx-auto mt-[10%]" 
                                src="https://cdn.discordapp.com/attachments/981506950569275482/1092494973255024670/Register.png" draggable="false" />
                                <div className="flex justify-center 
                                                xl:mt-[10%]
                                                lg:mt-[14%]
                                                md:mt-[19%]">
                                    <input className="xl:w-7/12 p-4 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    lg:w-8/12 p-3 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    md:w-9/12 p-3 drop-shadow-lg text-lg rounded-xl border-2 border-black"
                                    type="text" placeholder="USERNAME" />
                                </div>
                                <div className="flex justify-center
                                                xl:mt-[4%]
                                                lg:mt-[6%]
                                                md:mt-[11%]">
                                    <input className="xl:w-7/12 p-4 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    lg:w-8/12 p-3 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    md:w-9/12 p-3 drop-shadow-lg text-lg rounded-xl border-2 border-black"
                                    type="text" placeholder="PASSWORD" />
                                </div>
                                <div className="flex justify-center 
                                                xl:mt-[4%]
                                                lg:mt-[6%]
                                                md:mt-[11%]">
                                    <input className="xl:w-7/12 p-4 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    lg:w-8/12 p-3 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    md:w-9/12 p-3 drop-shadow-lg text-lg rounded-xl border-2 border-black"
                                    type="text" placeholder="CONFIRM PASSWORD" />
                                </div>
                                <div className="flex justify-center
                                                xl:mt-[10%]
                                                lg:mt-[14%]
                                                md:mt-[19%]">
                                    <button className="xl:w-5/12 p-4 font-bold text-3xl rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    lg:w-6/12 p-3 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
                                                    md:w-7/12 p-3 font-bold rounded-xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover">REGISTER</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default registerpage;