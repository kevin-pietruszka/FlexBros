import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonCard } from '@ionic/react';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';


const CreateWorkout: React.FC = () => {

    useEffect(() => {
      
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class="ion-text-center">Create Workout</IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Create Workout</IonTitle>
                    </IonToolbar>
                </IonHeader>                
                <IonCard>
                    <IonList>
                        <IonItem>
                            <IonInput placeholder='Exercise name'></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonTitle>Set X</IonTitle>                            
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder='Number of reps'></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder='Weight'></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonButton>Add</IonButton>
                            <IonButton routerLink='/EditWorkout'>Finish</IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default CreateWorkout