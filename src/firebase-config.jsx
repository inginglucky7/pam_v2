// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKZUGc9TW7mG1t1D_RW7bjPdZpEIah7Bs",
    authDomain: "pam-tictactoev2.firebaseapp.com",
    databaseURL: "https://pam-tictactoev2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pam-tictactoev2",
    storageBucket: "pam-tictactoev2.appspot.com",
    messagingSenderId: "455288606680",
    appId: "1:455288606680:web:298fc550c29d5b4c5f2cad",
    measurementId: "G-J3GLPMFGK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export default firebaseConfig;