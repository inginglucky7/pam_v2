import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";

const Protected = ({children}) => {
    const {currentUser} = useAuth();
    if(!currentUser){
        return <Navigate to={"/"}></Navigate>
    }
    return children
}

export default Protected;