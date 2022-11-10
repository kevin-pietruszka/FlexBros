/* Firebase imports */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCCoXcYl2kHu4Vso_PMhVXhMdLaj7C2whY",
    authDomain: "flexbros-e3945.firebaseapp.com",
    projectId: "flexbros-e3945",
    storageBucket: "flexbros-e3945.appspot.com",
    messagingSenderId: "662856376755",
    appId: "1:662856376755:web:8c5f664896d935730f2bc6",
    measurementId: "G-RY4NMVS1EC"
}

export const app = initializeApp(firebaseConfig)

// Auth
export const auth = getAuth(app)