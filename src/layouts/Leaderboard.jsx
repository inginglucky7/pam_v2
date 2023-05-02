import React, {useState, useEffect} from "react";
import "./Kiddo.css"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import {onValue, ref, orderByChild, query, endAt, limitToLast, get, off, update} from "firebase/database";
import {db} from "../firebase-config.jsx";

const leaderboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userScores, setUserScore] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const {usersList, userName, currentUser, usersListRef, gameRoomsRef} = useAuth();
    const sort = [];

    useEffect(() => {
        onValue(gameRoomsRef, (snapshot) => {
            const gameRooms = snapshot.val();
            setRoomList(gameRooms);
            // console.log(location);
            // console.log(params["*"]);
        })
    }, []);

    useEffect(() => {
        const usersRef = ref(db, "usersList");
        const queRef = query(usersRef, orderByChild("score"), limitToLast(10));
        const handleData = (snapshot) => {
            const data = [];
            snapshot.forEach((childSnap) => {
                const childData = childSnap.val();
                data.push(childData);
            })
            setUserScore(data.reverse());
        }
        onValue(queRef, handleData);

        return () => {
            off(queRef, handleData);
        }
    }, []);

    // useEffect(() => {
    //     try {
    //         Object.keys(roomList).map((room) => {
    //             Object.keys(usersList).map((user) => {
    //                 //console.log(user === roomList[room].playerX.uid)
    //                 console.log(usersList[roomList[room].playerX.uid].score + 100)
    //                 // update(ref(db, "usersList/" + roomList[room].playerO.uid), {
    //                 //     score: usersList[roomList[room].playerO.uid].score + 100,
    //                 // })
    //             })
    //         })
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    //
    // }, []);


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
                        {
                            usersList === null ? <></> : Object.keys(userScores).map((user) => (
                                <tr key={user} className="bg-kiddolightyellow">
                                    <th scope="row" className="py-3">{parseInt(Object.keys(userScores).indexOf(user)) + 1}</th>
                                    <th className="py-3">{userScores[user].email.substring(0, userScores[user].email.indexOf("@"))}</th>
                                    <td className="py-3">{userScores[user].email}</td>
                                    <td className="py-3">{userScores[user].score}</td>
                                </tr>
                                ))
                        }
                        </tbody>
                    </table>
                </div>

            </div>

            <div className="absolute text-2xl bottom-0 ml-6 mb-6">
                <button onClick={(e) => {
                    navigate("/mainmenu");
                }} className="rounded-2xl bg-kiddoyellow bg-opacity-90 px-6 py-2 text-black font-bold shadow-xl drop-shadow-kiddodropshadow duration-200 hover:bg-kiddoyellowhover">BACK</button>
            </div>

        </div>

    )
}

export default leaderboard;