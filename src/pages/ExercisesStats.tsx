import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';


const ExerciseStats: React.FC = () => {

    useEffect(() => {
      
    }, []);

    return (
    
    <IonPage>
        <IonHeader>
            <IonTitle>
                Display Exercise Stats
            </IonTitle>
        </IonHeader>
        <IonContent>
            Kevin is gay?
        </IonContent>
    </IonPage>
    );
};

export default ExerciseStats;