import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton } from '@ionic/react';
import { useState } from 'react';

/* Firebase imports */
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initNewUser } from '../db';

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

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

  const createAccount  = async () => {
    if (password1 == password2) {
      createUserWithEmailAndPassword(auth, email, password1)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          initNewUser(user.uid);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonInput placeholder="Email" onIonInput={(e:any) => setEmail(e.target.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput type="password" placeholder="Password" onIonInput={(e:any) => setPassword1(e.target.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput type="password" placeholder="Confirm Password" onIonInput={(e:any) => setPassword2(e.target.value)}></IonInput>
          </IonItem>
          <IonButton onClick={() => createAccount()} routerLink='/Login'>Create</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;
