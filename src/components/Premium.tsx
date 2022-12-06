import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonModal,
    IonProgressBar,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { changeToPaidStatus, checkPaidUser } from "../db";
import { auth } from "../firebase";

const Premium: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [changingVersion, setChangingVersion] = useState(false);
    const [loading, setLoading] = useState(true);
    const [premiumStatus, setPremiumStatus] = useState(false);
    const [userID, setUserID] = useState("");

    useEffect(() => {
        if (auth.currentUser == null) {
            setUserID("A4A2aPnIz2VH39FsbGkPwZnzYM43");
            return;
        } else {
            setUserID(auth.currentUser.uid);
        }
    }, []);

    useEffect(() => {
        if (userID === "") return;

        checkPaidUser(userID).then((res) => {
            setPremiumStatus(res);
            
            setLoading(false);
        });
    }, [userID]);

    useEffect(() => {

        return () => {};
    }, [premiumStatus]);

    const changePremium = () => {
        setChangingVersion(true);

        changeToPaidStatus(userID, !premiumStatus).then((res) => {
            if (res) {
                setPremiumStatus(!premiumStatus);
                setChangingVersion(false);
            }
        });
    };

    return (
        <IonItem>
            <IonItem button onClick={() => setIsOpen(true)}>
                <IonText> Change to Premium Account</IonText>
            </IonItem>
            <IonModal isOpen={isOpen} backdropDismiss={false}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle> Premium Account </IonTitle>
                        <IonButtons slot="end">
                            {changingVersion || loading ? (
                                <IonButton disabled={true}>Close</IonButton>
                            ) : (
                                <IonButton onClick={() => setIsOpen(false)}>
                                    Close
                                </IonButton>
                            )}
                        </IonButtons>

                        {changingVersion || loading ? (
                            <IonProgressBar type="indeterminate">
                                {" "}
                            </IonProgressBar>
                        ) : (
                            <></>
                        )}
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonItem>
                        <IonText>
                            {" "}
                            You are a {premiumStatus ? "Premium" : "Scrub"} member, change status?
                            
                        </IonText>

                        {changingVersion ? (
                            <IonButton slot ='end' disabled={true}> Switch </IonButton>
                        ) : (
                            <IonButton slot='end' onClick={changePremium}>
                                {" "}
                                Switch{" "}
                            </IonButton>
                        )}
                    </IonItem>
                </IonContent>
            </IonModal>
        </IonItem>
    );
};

export default Premium;
