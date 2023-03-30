import RegisterPage from "../layouts/RegisterPage.jsx";
import {useState} from "react";
import firebaseConfig from '../firebase-config.jsx';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {redirect} from "react-router-dom";
const SignUp = async () => {

    const RegBtn = document.querySelector("#username");
    RegBtn.addEventListener("onchange", event => {
        event.preventDefault();
        setUserName(event.target.value);
    })
};

export default SignUp;