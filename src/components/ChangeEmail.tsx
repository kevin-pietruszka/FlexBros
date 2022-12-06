import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonProgressBar,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { updateEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const ChangeEmail: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [changingEmail, setChangingEmail] = useState(false);

    useEffect(() => {}, [changingEmail]);

    const changeEmail = () => {


        setChangingEmail(true);

        if (auth.currentUser == null || auth.currentUser.email !== oldEmail || newEmail !== confirmEmail) {
            alert("Error in input. try again");
            setChangingEmail(false);
            return;
        }

        updateEmail(auth.currentUser, newEmail)
            .then(() => {
                setChangingEmail(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const verifyEmailEntry = () => {
        if (oldEmail === "" || newEmail === "" || confirmEmail === "") return;

        if (
            validateEmail(oldEmail) &&
            validateEmail(newEmail) &&
            validateEmail(confirmEmail)
        ) {
            changeEmail();
        } else {
            alert('One of the emails are not valid');
        }
    };

    return (
        <IonItem>
            <IonItem button onClick={() => setIsOpen(true)}>
                <IonText> Change Email for Account</IonText>
            </IonItem>
            <IonModal isOpen={isOpen} backdropDismiss={false}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Change Email</IonTitle>
                        <IonButtons slot="end">
                            {changingEmail ? (
                                <IonButton disabled={true}>Close</IonButton>
                            ) : (
                                
                                <IonButton onClick={() => setIsOpen(false)}>
                                    Close
                                </IonButton>
                            )}
                        </IonButtons>

                        {changingEmail ? (
                            <IonProgressBar type="indeterminate"> </IonProgressBar>
                        ) : (
                            <></>
                        )}
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonItem>
                        <IonLabel>Enter old email: </IonLabel>
                        <IonInput
                            onIonChange={(e) => {
                                if (
                                    e.detail.value == null ||
                                    e.detail.value === undefined
                                )
                                    return;
                                setOldEmail(e.detail.value);
                            }}
                            placeholder=""
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Enter new email: </IonLabel>
                        <IonInput
                            onIonChange={(e) => {
                                if (
                                    e.detail.value == null ||
                                    e.detail.value === undefined
                                )
                                    return;
                                setNewEmail(e.detail.value);
                            }}
                            placeholder=""
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Confirm new email: </IonLabel>
                        <IonInput
                            onIonChange={(e) => {
                                if (
                                    e.detail.value == null ||
                                    e.detail.value === undefined
                                )
                                    return;
                                setConfirmEmail(e.detail.value);
                            }}
                            placeholder=""
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={verifyEmailEntry}>
                            Change Email
                        </IonButton>
                    </IonItem>
                </IonContent>
            </IonModal>
        </IonItem>
    );
};

export default ChangeEmail;
