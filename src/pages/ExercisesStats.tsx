import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getUserExercises, getExerciseHistory } from '../db';
import { auth } from '../firebase';


const ExerciseStats: React.FC = () => {

    const [userID, setUserID] = useState("");
    const [options, setOptions] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState("");
    const [historyData, setHistoryData] = useState({});
    const [loadedHistory, setloadedHistory] = useState(false);

    useEffect(() => {

        if (auth.currentUser != null) {
            setUserID(auth.currentUser.uid);
            getUserExercises(userID).then( (results) => {
                setOptions(arr => [...results]);
                setLoading(true);
            })
        } else {
            setUserID("A4A2aPnIz2VH39FsbGkPwZnzYM43");
            getUserExercises("A4A2aPnIz2VH39FsbGkPwZnzYM43").then( (results) => {
                setOptions(arr => [...results]);
                setLoading(true);
            })
        }
        
    }, []);

    const processHistory  = (history: any, start: string, days:string[]) => {

    }

    useEffect(() => {
      console.log(selectedExercise);
    }, [selectedExercise])
    

    const exerciseSelect = (e: any) => {
        setSelectedExercise(e.detail.value)
    }

    return (
    
        <IonPage>
            <IonHeader>
                <IonTitle>
                    Exercise Stat Viewer
                </IonTitle>
                
            </IonHeader>
            <IonContent>

                <IonItem>
                    {loading ? 
                        <IonSelect onIonChange={exerciseSelect} interface="popover" placeholder="Select exercise">
                            {options.map(function(exercise, idx) {
                                return (<IonSelectOption key={idx} value={exercise} > {exercise} </IonSelectOption>)
                            })}
                        </IonSelect>
                        : <IonSelect></IonSelect>
                    }
                </IonItem>

            </IonContent>
        </IonPage>
    );
};

export default ExerciseStats;