import React from "react";
import "./Kiddo.css"
import {useAuth} from "../contexts/AuthContext.jsx";
import {auth} from "../firebase-config.jsx";
import {useNavigate} from "react-router-dom";

const mainmenu = () => {
    const {signIn, signInAnonymous, currentUser, logOut, user, setUser} = useAuth();
    const navigate = useNavigate();
    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logOut();
            if(!user.loggedIn){
                navigate("/", {replace : true});
            }
            console.log(auth?.currentUser?.email);
        } catch (e) {
            console.log(e.message)
        }
    }
    return (
        <div>
                <div className="grid grid-cols-2 bg-kiddogray w-screen h-screen">
                    <div className="flex justify-center my-auto">
                        Leaderboard
                    </div>
                    <div className="my-auto">
                        <div className="flex justify-center items-center w-[500px] h-[120px] rounded-2xl bg-kiddoyellow mx-auto drop-shadow-kiddodropshadow mb-8">
                            <img className="w-2/12 h-2/12" src="https://cdn-icons-png.flaticon.com/512/686/686700.png" />
                            <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-black mx-8">
                                <h1 className="text-white text-xl font-bold">9</h1>
                            </div>
                            <div>
                                <div className="flex w-[100px] h-[40px]">
                                    <h1 className="text-2xl font-bold">PAM</h1>
                                    <h1 className="text-2xl font-bold ml-20">1000</h1>
                                </div>
                                <h1 className="text-xl">63070000@it.kmitl.ac.th</h1>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mb-8">
                            <button className="w-4/12 p-4 text-3xl font-bold rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover">PROFILE</button>
                        </div>
                        <div className="flex justify-center items-center mb-32">
                            <button onClick={handleLogOut} className="w-3/12 p-2 text-2xl font-bold rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover">LOGOUT</button>
                        </div>
                        <div className="flex justify-center items-center mb-8">
                            <button className="w-4/12 p-4 text-3xl font-bold rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover">HOW TO PLAY</button>
                        </div>
                        <div className="flex justify-center items-center">
                            <button className="w-6/12 p-6 text-4xl font-bold rounded-2xl drop-shadow-kiddodropshadow bg-kiddoyellow hover:bg-kiddoyellowhover">START GAME</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default mainmenu;