import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import ChangeEmail from "../components/ChangeEmail";
import ChangePassword from "../components/ChangePassword";
import Premium from "../components/Premium";
import { auth } from "../firebase";

const Settings: React.FC = () => {
    const [userID, setUserID] = useState("");

    useEffect(() => {
        if (auth.currentUser != null) {
            setUserID(auth.currentUser.uid);
        } else {
            setUserID("A4A2aPnIz2VH39FsbGkPwZnzYM43");
        }
    }, []);

    useEffect(() => {
        if (userID === '') return;
        
    }, [userID]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center" size="large">Settings</IonTitle>
                </IonToolbar>                
            </IonHeader>

            <IonContent>
                <IonList>
                    <ChangeEmail></ChangeEmail>
                    <ChangePassword></ChangePassword>
                    <Premium></Premium>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
