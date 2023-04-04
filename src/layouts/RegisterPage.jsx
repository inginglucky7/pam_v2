import React, {useState, useRef} from "react";
import "./Kiddo.css"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase-config.jsx";
const registerpage = () => {
    const [user, setUser] = useState({});
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [userConfirmPassword, setUserConfirmPassword] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {signUp, currentUser} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleReg = async (e) => {
        e.preventDefault();
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError("Password do not match");
        }
        try {
            setError("")
            setLoading(true);
            console.log(emailRef);
            await signUp(userEmail, userPassword);
            if(!user.loggedIn){
                navigate("/mainmenu", {replace : true});
            }
            console.log(auth.currentUser.email);
        } catch (e) {
            setError("Failed to create account");
            console.log(e.message);
        }
        setLoading(false);
    }

    return (
        <div>
            <div className="flex justify-center items-center bg-kiddogray w-full h-full">
                <div className="grid grid-cols-2 bg-slate-50 w-[80%] h-[80%] rounded-3xl drop-shadow-2xl my-40">
                    <div className="my-auto">
                        <img className="kiddologo w-6/12 h-6/12 mx-auto drop-shadow-md" src="https://cdn.discordapp.com/attachments/981506950569275482/1078961231815245824/Logo.png" draggable="false" />
                        <img className="w-6/12 h-6/12 mx-auto drop-shadow-md" src="https://cdn.discordapp.com/attachments/981506950569275482/1078970065866727444/Name.png" draggable="false" />
                    </div>
                    <div className="bg-slate-100 rounded-r-3xl">
                        <div>
                            <img className="xl:w-8/12 h-4/12 mx-auto drop-shadow-md mx-auto mt-[10%]
                                                lg:w-9/12 h-5/12 mx-auto drop-shadow-md mx-auto mt-[10%]
                                                md:w-11/12 h-7/12 mx-auto drop-shadow-md mx-auto mt-[10%]"
                                 src="https://cdn.discordapp.com/attachments/981506950569275482/1092494973255024670/Register.png" draggable="false" />
                            <div ref={emailRef} onChange={(event) => {
                                setUserEmail(event.target.value);
                            }} className="flex justify-center
                                                xl:mt-[8%]
                                                lg:mt-[8%]
                                                md:mt-[8%]">
                                <input className="xl:w-7/12 p-4 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    lg:w-8/12 p-3 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    md:w-9/12 p-3 drop-shadow-lg text-lg rounded-xl border-2 border-black"
                                       type="text" placeholder="USERNAME" />
                            </div>
                            <div ref={passwordRef} onChange={(event) => {
                                setUserPassword(event.target.value);
                            }} className="flex justify-center
                                                xl:mt-[3%]
                                                lg:mt-[3%]
                                                md:mt-[3%]">
                                <input className="xl:w-7/12 p-4 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    lg:w-8/12 p-3 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    md:w-9/12 p-3 drop-shadow-lg text-lg rounded-xl border-2 border-black"
                                       type="password" placeholder="PASSWORD" />
                            </div>
                            <div ref={confirmPasswordRef} onChange={(event) => {
                                setUserConfirmPassword(event.target.value);
                            }} className="flex justify-center
                                                xl:mt-[3%]
                                                lg:mt-[3%]
                                                md:mt-[3%]">
                                <input className="xl:w-7/12 p-4 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    lg:w-8/12 p-3 drop-shadow-lg text-lg rounded-xl border-4 border-black
                                                    md:w-9/12 p-3 drop-shadow-lg text-lg rounded-xl border-2 border-black"
                                       type="password" placeholder="CONFIRM PASSWORD" />
                            </div>
                            <div className="flex justify-center
                                                xl:mt-[8%] mb-[10%]
                                                lg:mt-[8%] mb-[10%]
                                                md:mt-[8%] mb-[10%]">
                                <button onClick={handleReg}
                                    className="xl:w-5/12 p-4 font-bold text-3xl rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover
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