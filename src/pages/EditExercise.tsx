import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonCardTitle, IonCard, IonRow, IonGrid, IonCol, IonIcon, IonLabel } from '@ionic/react';
import { addListener } from 'process';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { getsUsersRoutines, readRoutine } from '../db';
import { Exercise, Routine, Set, Workout } from '../routine';
import { getLoadedRoutine } from './Tab1';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const daysOfWeeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const date = new Date()

const EditExercise: React.FC = () => {
  let history = useHistory()

  const [sets, setSets] = useState<Set[]>([]);

  let exercise = useLocation().state as Exercise
  
  if (sets.length === 0) {
    setSets(exercise.baseline)
  }

  
  function addSet () {
    setSets( sets => [...sets, new Set(0,0)])
    
  }

  function modifySet(setNum : number) {

  }

  var routine = getLoadedRoutine()

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
            {sets.length >= 1 && <IonRow>
              <IonCol className='setFont'>Set 1</IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Reps: </IonLabel>
                    <IonInput type='number' value={sets[0].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Weight: </IonLabel>
                    <IonInput type='number' value={sets[0].weight}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol><IonButton onClick={() => modifySet(0)} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {sets.length >= 2 && <IonRow>
              <IonCol className='setFont'>Set 2</IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Reps: </IonLabel>
                    <IonInput type='number' value={sets[1].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Weight: </IonLabel>
                    <IonInput type='number' value={sets[1].weight}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol><IonButton size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {sets.length >= 3 && <IonRow>
              <IonCol className='setFont'>Set 3</IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Reps: </IonLabel>
                    <IonInput type='number' value={sets[2].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Weight: </IonLabel>
                    <IonInput type='number' value={sets[2].weight}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol><IonButton size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {sets.length >= 4 && <IonRow>
              <IonCol className='setFont'>Set 4</IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Reps: </IonLabel>
                    <IonInput type='number' value={sets[3].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Weight: </IonLabel>
                    <IonInput type='number' value={sets[3].weight}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol><IonButton size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {sets.length >= 5 && <IonRow>
              <IonCol className='setFont'>Set 5</IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Reps: </IonLabel>
                    <IonInput type='number' value={sets[4].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Weight: </IonLabel>
                    <IonInput type='number' value={sets[4].weight}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol><IonButton size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {sets.length >= 6 && <IonRow>
              <IonCol className='setFont'>Set 6</IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Reps: </IonLabel>
                    <IonInput type='number' value={sets[5].reps}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                    <IonLabel class="ion-text-center">Weight: </IonLabel>
                    <IonInput type='number' value={sets[5].weight}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol><IonButton size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            <IonCol>
                <IonButton routerLink='/Tab1'>Back</IonButton>
                {sets.length < 6 && <IonButton onClick={() => addSet()}>Add Set</IonButton>}
            </IonCol>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EditExercise;
