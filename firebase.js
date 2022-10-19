// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCoXcYl2kHu4Vso_PMhVXhMdLaj7C2whY",
  authDomain: "flexbros-e3945.firebaseapp.com",
  projectId: "flexbros-e3945",
  storageBucket: "flexbros-e3945.appspot.com",
  messagingSenderId: "662856376755",
  appId: "1:662856376755:web:8c5f664896d935730f2bc6",
  measurementId: "G-RY4NMVS1EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);