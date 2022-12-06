import { IonContent, IonHeader, IonPage, IonTitle, IonItem, IonSelect, IonSelectOption, IonCard, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExerciseGraph from '../components/ExerciseGraph';
import { getUserExercises, getExerciseHistory } from '../db';
import { auth } from '../firebase';


const ExerciseStats: React.FC = () => {

    const [userID, setUserID] = useState("");
    const [options, setOptions] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState("");
    const [selectedAxis, setSelectedAxis] = useState('reps');
    const [historyData, setHistoryData] = useState({});
    const [loadedHistory, setloadedHistory] = useState(false);

    useEffect(() => {

        if (auth.currentUser != null) {

            setUserID(auth.currentUser.uid);
            
        } else {

            setUserID('KznJACOrQoOeBo4SrZywbPc6KE72');
            
        }
        
    }, []);

    useEffect(() => {

        if (userID === '') return;

        getUserExercises(userID).then( (results) => {
            setOptions(arr => [...results]);
            setLoading(true);
        })
    
    }, [userID])

    useEffect(() => {

        if (userID === '' || selectedExercise === '') return;

        const processHistory  = (history: any, start: string, days:string[]) => {
    
            let data = Object.entries(history).map(([date, setInfo]) => {
                
                let yaxis = 0;
                
                if (setInfo instanceof Array) {
                    for (let i = 0; i < setInfo.length; i++) {

                        if (selectedAxis === 'reps') {
                            yaxis += setInfo[i].reps
                        } else if (selectedAxis === 'weight') {
                            yaxis += setInfo[i].weight
                        }

                    }

                    if (selectedAxis === 'weight') {
                        yaxis /= setInfo.length;
                    }
                }
    
                return ({
                    label: date,
                    value: yaxis
                })
            })

            data = data.sort((a, b) => {

                const date1 = new Date(a.label);
                const date2 = new Date(b.label);

                if (date1 < date2) {
                    return -1;
                } else if (date1 > date2) {
                    return 1;
                } else {
                    return 0;
                }
            })

            setHistoryData(data);
            setloadedHistory(true);
        }

        getExerciseHistory(userID, selectedExercise)
            .then((res)=>{processHistory(res?.exercise.history, res?.start, res?.days)})
            .catch((err) => console.log(err))
    
    }, [userID, selectedExercise, selectedAxis])
    

    const exerciseSelect = (e: any) => {
        setSelectedExercise(e.detail.value)
    }

    const progressSelect = (e:any) => {
        setSelectedAxis(e.detail.value);
    }

    return (
    
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center" size="large">
                        Exercise Stat Viewer
                    </IonTitle>
                </IonToolbar>
                
            </IonHeader>
            <IonContent id="exercise_graph">

                {
                    loadedHistory ? <ExerciseGraph chartData={historyData} yaxis={selectedAxis}> </ExerciseGraph> : <IonCard> </IonCard>
                }

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

                <IonItem>
                    <IonSelect onIonChange={progressSelect} interface="popover" placeholder="Select exercise">
                        <IonSelectOption value='reps'>
                            Reps
                        </IonSelectOption>
                        <IonSelectOption value='weight'>
                            Weight
                        </IonSelectOption>
                    </IonSelect>
                </IonItem>

            </IonContent>
        </IonPage>
    );
};

export default ExerciseStats;