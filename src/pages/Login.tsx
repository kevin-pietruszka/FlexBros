import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton } from '@ionic/react';
import { useState } from 'react';
import './Global.css'

/* Firebase imports */
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

var uid : string

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login  = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        uid = user.uid
        // ...
        console.log('login success')
        console.log(uid)
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
          <IonTitle class="ion-text-center">Login</IonTitle>
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
            <IonButton color="blue" id="login_button" onClick={() => login()} routerLink='/Tab1'>Login</IonButton> 
            <IonButton color="blue" id="create_account_button" routerLink='/CreateAccount'>Create Account</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export function getUID() { return uid }
export default Login;
