import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonButton,
    IonCard,
    IonInput,
    IonItem,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { auth } from "../firebase";


const RoutineMaker = (props: any) => {

    const [userID, setUserID] = useState("");
    const [routineName, setRoutineName] = useState("");

    useEffect(() => {
        if (auth.currentUser != null) {
            setUserID(auth.currentUser.uid);
        } else {
            setUserID("A4A2aPnIz2VH39FsbGkPwZnzYM43");
        }

    }, []);

    useEffect(() => {
        console.log(`${userID}: ${routineName}`);
    }, [userID, routineName])
    

    const routineNameInput = (e: any) => {
        setRoutineName(e.detail.value);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">Routine Maker</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Routine Maker</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonItem>
                        <IonInput
                            onIonChange={routineNameInput}
                            placeholder="Name of routine"
                        ></IonInput>
                    </IonItem>
                    <IonList>
                        <IonItem>
                            <IonTitle>Workouts</IonTitle>
                        </IonItem>
                        <IonItem>
                            <IonContent>begin list of workouts</IonContent>
                            <IonButton id="remove_button">Remove</IonButton>
                        </IonItem>
                    </IonList>
                    <IonButton onClick={props.backToRoutines}> Finish </IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default RoutineMaker;
