import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonCard } from '@ionic/react';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';


const EditWorkout: React.FC = () => {

    useEffect(() => {
      
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class="ion-text-center">Edit Workout</IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Edit Workout</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonList>
                        <IonItem>
                        <IonInput placeholder='Workout name'></IonInput>
                        </IonItem>
                        <IonItem>
                            begin list of exercises in workout
                        </IonItem>
                        <IonItem>
                            <IonButton routerLink='/CreateWorkout'>Add</IonButton>
                            <IonButton>Finish</IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default EditWorkout;