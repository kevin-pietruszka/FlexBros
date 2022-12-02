import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonCardTitle, IonCard, IonRow, IonGrid, IonCol, IonIcon } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { getsUsersRoutines, readRoutine } from '../db';
import { Exercise, Routine, Workout } from '../routine';
import { getLoadedRoutine } from './Tab1';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const daysOfWeeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const date = new Date()
var day : number

const CalendarDay: React.FC = () => {
  let history = useHistory()

  day = useLocation().state as number
  let dayOfWeek = daysOfWeeks[new Date(date.getFullYear(), date.getMonth(), day).getDay()]

  var routine = getLoadedRoutine()

  var workout : Workout | undefined
  routine.workouts.forEach((workout_) => {
    workout_.days.forEach((day) => {
      if (day === dayOfWeek) {
        workout = workout_
      }
    })
  })

  function editExercise (exercise: Exercise | undefined) {
    history.push({
      pathname: '/EditExercise',
      state: exercise
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">FlexBros</IonTitle>
        </IonToolbar>
      </IonHeader>
      {workout != undefined && <IonContent fullscreen>
        <IonCard>
          <IonCardTitle class="ion-text-center">{months[date.getMonth()] + ' ' + day}</IonCardTitle>
        </IonCard>
        <IonCard>
          <IonCardTitle class="ion-text-center">{workout.workoutName}</IonCardTitle>
          <IonGrid class="ion-text-center">
            {workout?.exercises.length >= 1 && <IonRow>
              <IonCol>{workout?.exercises[0].exerciseName}</IonCol>
              <IonCol><IonButton onClick={() => editExercise(workout?.exercises[0])} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {workout?.exercises.length >= 2 && <IonRow>
              <IonCol>{workout?.exercises[1].exerciseName}</IonCol>
              <IonCol><IonButton onClick={() => editExercise(workout?.exercises[1])} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {workout?.exercises.length >= 3 && <IonRow>
              <IonCol>{workout?.exercises[2].exerciseName}</IonCol>
              <IonCol><IonButton onClick={() => editExercise(workout?.exercises[2])} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {workout?.exercises.length >= 4 && <IonRow>
              <IonCol>{workout?.exercises[3].exerciseName}</IonCol>
              <IonCol><IonButton onClick={() => editExercise(workout?.exercises[3])} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {workout?.exercises.length >= 4 && <IonRow>
              <IonCol>{workout?.exercises[5].exerciseName}</IonCol>
              <IonCol><IonButton onClick={() => editExercise(workout?.exercises[4])} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            <IonRow>
              <IonCol><IonButton routerLink='/Tab1'>Back</IonButton><IonButton>Complete Workout</IonButton></IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>}
    </IonPage>
  );
};

export function getDay() { return day }
export default CalendarDay;
