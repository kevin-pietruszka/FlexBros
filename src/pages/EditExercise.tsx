import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonCardTitle, IonCard, IonRow, IonGrid, IonCol } from '@ionic/react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { updateHistory } from '../db';
import { Exercise, Set } from '../routine';
import { getDate } from './CalendarDay';

const uid = "A4A2aPnIz2VH39FsbGkPwZnzYM43"

const EditExercise: React.FC = () => {

  const [sets, setSets] = useState<Set[]>([]);  

  let exercise = useLocation().state as Exercise
  
  if (sets.length === 0 && exercise !== undefined) {
    setSets(exercise.baseline)
  }

  function addSet () {
    setSets(sets => [...sets, {'weight' : 0, 'reps' : 0}])
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

  function Save() {
    var date = getDate()
    var dateStr : string

    if (date.getDate() < 10) {
      dateStr = date.getMonth() + '/0' + date.getDate() + '/' + date.getFullYear()
    } else {
      dateStr = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
    }
    
    var exHistory = exercise.history
    exHistory[dateStr] = sets
    console.log(exHistory)
    updateHistory(uid, exercise.exerciseName, exHistory)
    setSets([])

    let history = useHistory()
    history.push({
      pathname: '/CalendarDay',
      state: getDate()
    })
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
              <IonCol className='setFont'>Set 1</IonCol>
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
              <IonCol className='setFont'>Set 2</IonCol>
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
              <IonCol className='setFont'>Set 3</IonCol>
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
              <IonCol className='setFont'>Set 4</IonCol>
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
              <IonCol className='setFont'>Set 5</IonCol>
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
              <IonCol className='setFont'>Set 6</IonCol>
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
            <IonCol>
                <IonButton onClick={() => setSets([])} routerLink='/CalendarDay'>Back</IonButton>
                {sets.length < 6 && <IonButton onClick={() => addSet()}>Add Set</IonButton>}
                <IonButton onClick={() => Save()} routerLink='/CalendarDay'>Save</IonButton>
            </IonCol>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EditExercise;
