import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonRouterLink } from '@ionic/react';
import { useState } from 'react';

/* Firebase imports */
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { userInfo } from 'os';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebaseConfig = {
    apiKey: "AIzaSyCCoXcYl2kHu4Vso_PMhVXhMdLaj7C2whY",
    authDomain: "flexbros-e3945.firebaseapp.com",
    projectId: "flexbros-e3945",
    storageBucket: "flexbros-e3945.appspot.com",
    messagingSenderId: "662856376755",
    appId: "1:662856376755:web:8c5f664896d935730f2bc6",
    measurementId: "G-RY4NMVS1EC"
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const login  = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log('login success')
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonInput placeholder="Email" onIonInput={(e:any) => setEmail(e.target.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput type="password" placeholder="Password" onIonInput={(e:any) => setPassword(e.target.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonButton onClick={() => login()} routerLink='/Tab1'>Login</IonButton> 
            <IonButton routerLink='/CreateAccount'>Create Account</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;
