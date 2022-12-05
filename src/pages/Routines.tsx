import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonButton,
    IonCard,
    IonItem,
    IonProgressBar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getsUsersRoutines } from "../db";
import { auth } from "../firebase";
import RoutineMaker from "./RoutineMaker";

const Routines: React.FC = () => {
    const [userID, setUserID] = useState("");
    const [userRoutines, setUserRoutines] = useState([""]);
    const [loadingRoutines, setLoadingRoutines] = useState(true);
    const [makeRoutine, setMakeRoutine] = useState(false);

    useEffect(() => {
        if (auth.currentUser != null) {
            setUserID(auth.currentUser.uid);
        } else {
            setUserID("A4A2aPnIz2VH39FsbGkPwZnzYM43");
        }
    }, []);

    useEffect(() => {
        if (userID === "") return;

        getsUsersRoutines(userID).then((res) => {
            setUserRoutines([...res]);
        });
    }, [userID]);

    useEffect(() => {
        setLoadingRoutines(false);
    }, [userRoutines]);

    const handleEndMaker = () => {
        setMakeRoutine(false);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">Routines</IonTitle>
                    {loadingRoutines ? (
                        <IonProgressBar type="indeterminate"></IonProgressBar>
                    ) : (
                        <></>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {makeRoutine ? (
                    <RoutineMaker backToRoutines={handleEndMaker}> </RoutineMaker>
                ) : (
                    <IonContent>
                        <IonHeader collapse="condense">
                            <IonToolbar>
                                <IonTitle size="large">Routines</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonCard>
                            <IonList>
                                <IonItem>
                                    <IonTitle>Routine list</IonTitle>
                                </IonItem>
                                {!loadingRoutines ? (
                                    userRoutines.map((val, index) => {
                                        return (
                                            <IonItem key={index}>
                                                {" "}
                                                {val}{" "}
                                            </IonItem>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </IonList>
                        </IonCard>
                        <IonList>
                            <IonButton onClick={() => setMakeRoutine(true)}>
                                Make a new routine
                            </IonButton>
                        </IonList>
                    </IonContent>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Routines;
