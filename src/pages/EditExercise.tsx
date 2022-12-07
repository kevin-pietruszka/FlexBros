import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonCardTitle, IonCard, IonRow, IonGrid, IonCol } from '@ionic/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { updateHistory } from '../db';
import { Set } from '../routine';
import { getSelectedDate } from './Calendar';
import { getExercise } from './CalendarDay';
let uid = 'KznJACOrQoOeBo4SrZywbPc6KE72'
const EditExercise: React.FC = () => {

  const [sets, setSets] = useState<Set[]>([]);  

  let state = useLocation().state
  let exercise = getExercise()
  
  if (sets.length === 0 && exercise !== undefined) {
    if (exercise.history[getDateString()] === undefined) {
      setSets(exercise.baseline)
    } else {
      setSets(exercise.history[getDateString()])
    }
  }

  function setReps (setNum : number, reps : string) {
    var setsCopy = sets
    setsCopy[setNum]['reps'] = parseInt(reps)
    setSets(setsCopy)
  }

  function setWeight (setNum : number, weight : string) {
    var setsCopy = sets
    setsCopy[setNum]['weight'] = parseInt(weight)
    setSets(setsCopy)
  }

  function getDateString() { 
    var date = getSelectedDate()

    if (date.getDate() < 10) {
      return date.getMonth() + '/0' + date.getDate() + '/' + date.getFullYear()
    }

    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
  }

  function Save() {
    var exHistory = exercise.history
    exHistory[getDateString()] = sets
    
    updateHistory(uid, exercise.exerciseName, exHistory)
    setSets([])
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">FlexBros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardTitle class="ion-text-center">{exercise?.exerciseName}</IonCardTitle>
        </IonCard>
        <IonCard class="ion-text-center">
          <IonGrid>
            <IonRow>
              <IonCol></IonCol>
              <IonCol>Reps</IonCol>
              <IonCol>Weight</IonCol>
            </IonRow>
            {sets.length >= 1 && <IonRow>
              <IonCol>Set 1</IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setReps(0, e.target.value)} type='number' value={sets[0].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setWeight(0, e.target.value)} type='number' value={sets[0].weight}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>}
            {sets.length >= 2 && <IonRow>
              <IonCol>Set 2</IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setReps(1, e.target.value)} type='number' value={sets[1].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setWeight(1, e.target.value)} type='number' value={sets[1].weight}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>}
            {sets.length >= 3 && <IonRow>
              <IonCol>Set 3</IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setReps(2, e.target.value)} type='number' value={sets[2].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setWeight(2, e.target.value)} type='number' value={sets[2].weight}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>}
            {sets.length >= 4 && <IonRow>
              <IonCol>Set 4</IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setReps(3, e.target.value)} type='number' value={sets[3].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setWeight(3, e.target.value)} type='number' value={sets[3].weight}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>}
            {sets.length >= 5 && <IonRow>
              <IonCol>Set 5</IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setReps(4, e.target.value)} type='number' value={sets[4].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setWeight(4, e.target.value)} type='number' value={sets[4].weight}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>}
            {sets.length >= 6 && <IonRow>
              <IonCol>Set 6</IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setReps(5, e.target.value)} type='number' value={sets[5].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonInput onIonInput={(e: any) => setWeight(5, e.target.value)} type='number' value={sets[5].weight}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>}
            <IonRow>
              <IonCol><IonButton id='exercise_button' color='blue' onClick={() => setSets(sets => [...sets, {'weight' : 0, 'reps' : 0}])} disabled={sets.length >= 6}>Add Set</IonButton></IonCol>
              <IonCol><IonButton id='exercise_button' color='blue' onClick={() => setSets(sets.slice(0, sets.length-1))} disabled={sets.length <= 1}>Remove Set</IonButton></IonCol>              
            </IonRow>
            <IonRow>
              <IonCol><IonButton id='exercise_button' color='blue' onClick={() => setSets([])} routerLink='/CalendarDay'>Back</IonButton></IonCol>
              <IonCol><IonButton id='exercise_button' color='blue' onClick={() => Save()} routerLink='/CalendarDay'>Save Exercise</IonButton></IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EditExercise;
