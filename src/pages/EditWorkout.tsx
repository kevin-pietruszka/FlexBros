import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';


const EditWorkout: React.FC = () => {

    useEffect(() => {
      
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>Edit Workout</IonToolbar>
            </IonHeader>
        </IonPage>
    );
};

export default EditWorkout;