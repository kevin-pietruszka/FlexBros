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
import { updatePassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const ChangePassword: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {}, [changingPassword]);

    const changePassword = () => {
        setChangingPassword(true);

        if (auth.currentUser == null || newPassword !== confirmPassword) {
            alert("Error in input. try again");
            setChangingPassword(false);
            return;
        }

        updatePassword(auth.currentUser, newPassword)
            .then(() => {
                setChangingPassword(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const validatePassword = (pw: string) => {
        return pw.match(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
        );
    };

    const verifyPasswordEntry = () => {
        if (newPassword === "" || confirmPassword === "") return;

        if (
            validatePassword(newPassword) &&
            validatePassword(confirmPassword)
        ) {
            changePassword();
        } else {
            alert(
                "Not a valid password. Please use 7-15 charaters with one numeric and one special character."
            );
        }
    };

    return (
        <IonItem>
            <IonItem button onClick={() => setIsOpen(true)}>
                <IonText> Change Password for Account</IonText>
            </IonItem>
            <IonModal isOpen={isOpen} backdropDismiss={false}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Change Password </IonTitle>
                        <IonButtons slot="end">
                            {changingPassword ? (
                                <IonButton disabled={true}>Close</IonButton>
                            ) : (
                                <IonButton onClick={() => setIsOpen(false)}>
                                    Close
                                </IonButton>
                            )}
                        </IonButtons>

                        {changingPassword ? (
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
                        <IonLabel>Enter new password: </IonLabel>
                        <IonInput
                            type="password"
                            onIonChange={(e) => {
                                if (
                                    e.detail.value == null ||
                                    e.detail.value === undefined
                                )
                                    return;
                                setNewPassword(e.detail.value);
                            }}
                            placeholder=""
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Confirm new password: </IonLabel>
                        <IonInput
                            type="password"
                            onIonChange={(e) => {
                                if (
                                    e.detail.value == null ||
                                    e.detail.value === undefined
                                )
                                    return;
                                setConfirmPassword(e.detail.value);
                            }}
                            placeholder=""
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={verifyPasswordEntry}>
                            Change Password
                        </IonButton>
                    </IonItem>
                </IonContent>
            </IonModal>
        </IonItem>
    );
};

export default ChangePassword;
