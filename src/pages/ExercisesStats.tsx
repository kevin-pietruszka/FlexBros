import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getUserExercises } from '../db';
import { auth } from '../firebase';
import './ExerciseStats.css';


const ExerciseStats: React.FC = () => {

    const [options, setOptions] = useState(['']);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (auth.currentUser != null) {
            getUserExercises(auth.currentUser.uid).then( (results) => {
                setOptions(results);
                setLoading(!loading);
            })
        }
        
    }, []);

    return (
    
    <IonPage>
        <IonHeader>
            <IonTitle>
                Exercise Stat Viewer
            </IonTitle>
        </IonHeader>
        <IonContent>
            {loading ? 
                <IonSelect interface="popover" placeholder="Select exercise">
                    {options.map(function(exercise, idx) {
                        return (<IonSelectOption value={exercise}> {exercise} </IonSelectOption>)
                    })}
                </IonSelect>
                : <></>
            }
            
        </IonContent>
    </IonPage>
    );
};

export default ExerciseStats;