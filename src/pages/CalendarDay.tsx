import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCardTitle, IonCard, IonRow, IonGrid, IonCol } from '@ionic/react';
import { time } from 'console';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Exercise, Workout } from '../routine';
import { getSelectedDate, getLoadedRoutine } from './Tab1';
import { updateHistory } from '../db';

const uid = "A4A2aPnIz2VH39FsbGkPwZnzYM43"
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const daysOfWeeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
var date_ : Date = getSelectedDate()
var exercise_ : Exercise 

const CalendarDay: React.FC = () => {
  let history = useHistory()

  const [date, setNewDate] = useState<Date>(getSelectedDate())

  let state = useLocation().state
  let selectedDate = getSelectedDate()
  
  if (date.getDate() != selectedDate.getDate() || date.getMonth() != selectedDate.getMonth() || date.getFullYear() != selectedDate.getFullYear()) {
    setNewDate(getSelectedDate())
    date_ = date
  }

  let dayOfWeek = daysOfWeeks[date.getDay()]
  var routine = getLoadedRoutine()
  
  var workout : Workout = new Workout('Rest', '', [], [])
  routine.workouts.forEach((workout_) => {
    workout_.days.forEach((day) => {
      if (day === dayOfWeek) {
        workout = workout_
      }
    })
  })

  function editExercise (exercise: Exercise | undefined) {
    exercise_ = exercise as Exercise
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
          <IonCardTitle class="ion-text-center">{months[date.getMonth()] + ' ' + date.getDate()}</IonCardTitle>
        </IonCard>
        <IonCard>
          <IonCardTitle class="ion-text-center">{workout.workoutName}</IonCardTitle>
          <IonGrid class="ion-text-center">
            {workout.exercises.length >= 1 && <IonRow>
              <IonCol>{workout.exercises[0].exerciseName}</IonCol>
              <IonCol><IonButton color='blue' onClick={() => editExercise(workout.exercises[0])} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {workout.exercises.length >= 2 && <IonRow>
              <IonCol>{workout.exercises[1].exerciseName}</IonCol>
              <IonCol><IonButton color='blue' onClick={() => editExercise(workout.exercises[1])} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {workout.exercises.length >= 3 && <IonRow>
              <IonCol>{workout.exercises[2].exerciseName}</IonCol>
              <IonCol><IonButton color='blue' onClick={() => editExercise(workout.exercises[2])} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {workout.exercises.length >= 4 && <IonRow>
              <IonCol>{workout.exercises[3].exerciseName}</IonCol>
              <IonCol><IonButton color='blue' onClick={() => editExercise(workout.exercises[3])} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            {workout.exercises.length >= 4 && <IonRow>
              <IonCol>{workout.exercises[5].exerciseName}</IonCol>
              <IonCol><IonButton color='blue' onClick={() => editExercise(workout.exercises[4])} size='small'>Modify</IonButton></IonCol>
            </IonRow>}
            <IonRow>
              <IonCol></IonCol>
              <IonCol><IonButton color='blue' routerLink='/Tab1'>Back</IonButton></IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>}
    </IonPage>
  );
};

export function getExercise() { return exercise_ }
export default CalendarDay;
