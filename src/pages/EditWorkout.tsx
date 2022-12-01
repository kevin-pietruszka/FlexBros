import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonCard } from '@ionic/react';
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
            <IonContent fullscreen>
                <IonCard>
                    <IonList>
                        <IonItem>
                            <IonTitle>Workout name</IonTitle>
                        </IonItem>
                        <IonItem>
                            begin list of exercises in workout
                        </IonItem>
                        <IonItem>
                            <IonButton>Add</IonButton>
                            <IonButton>Finish</IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default EditWorkout;