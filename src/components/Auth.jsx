import React, {useState, useEffect} from "react";
import firebaseConfig from "../firebase-config.jsx";

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(null);
    const [curentUser, setCurentUser] = useState(null);
}