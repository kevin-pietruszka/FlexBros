import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./Global.css";

/* Firebase imports */
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useHistory } from "react-router";

const Login: React.FC = () => {
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        return () => {};
    }, [email, password]);

    const login = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("login success");
                history.push('/tab1');
            })
            .catch((error) => {
                alert('Retry login');
                console.log(error);
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
                        <IonInput
                            placeholder="Email"
                            onIonInput={(e: any) => setEmail(e.target.value)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="password"
                            placeholder="Password"
                            onIonInput={(e: any) => setPassword(e.target.value)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonButton
                            color="blue"
                            id="login_button"
                            onClick={() => login()}
                        >
                            Login
                        </IonButton>
                        <IonButton
                            color="blue"
                            id="create_account_button"
                            onClick={(e:any) => {history.push('/CreateAccount')}}
                        >
                            Create Account
                        </IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Login;
