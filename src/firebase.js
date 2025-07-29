// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC2bt3Ym4rdxmIdvNoCi7Xs6TRKZvU_zfI",
    authDomain: "netflix-b55e0.firebaseapp.com",
    projectId: "netflix-b55e0",
    appId: "1:515747744903:web:407af183d477f62bc6bc22",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut };
