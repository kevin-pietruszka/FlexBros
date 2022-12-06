import { IonCardTitle, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonRow, IonList, IonGrid, IonCol, IonItem, IonLabel, IonItemDivider } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Routine, Workout, Exercise } from "../routine"
import { getsUsersRoutines, readRoutine, createRoutine } from "../db"
import React, { useState, useEffect, useRef } from 'react';
import './Tab2.css';
import 


const Tab2: React.FC = () => {

  let newRoutine;
  const [workouts,setWorkouts] = useState<Workout[]>([]);
  const inputRef = useRef();
  const inputValue = () => inputRef.current.getInputElement();

  function makeRoutine(name: string, userId: string) {
    newRoutine = new Routine(name, userId, workouts);
    createRoutine(newRoutine);
  }

  const createWorkout = function(name: string, exercises: Exercise[], days: string[]) {
    const newWorkout = new Workout(name, 'userId', days, exercises);
    setWorkouts([...workouts, newWorkout]);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Workouts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Routine Name</IonTitle>
            <IonInput ref={inputRef} placeholder = "Enter Routine Name"></IonInput>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {workouts.map(workout => {
          return (
            <IonItem key={workout.id}>
              <IonLabel>{workout.workoutName}</IonLabel>
            </IonItem>
          )
        })}
        </IonContent>
        <IonButton id="addWorkout" onClick={}>+</IonButton>
        <IonButton id="Finish" onClick={() => makeRoutine('test', 'userId')}>Finish</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
