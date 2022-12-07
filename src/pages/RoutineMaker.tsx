import { IonCardTitle, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonRow, IonList, IonGrid, IonCol, IonItem, IonLabel, IonItemDivider } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Routine, Workout, Exercise } from "../routine"
import { getsUsersRoutines, readRoutine, createRoutine, checkPaidUser } from "../db"
import React, { useState, useEffect, useContext } from 'react';
import './Tab2.css';
import trash_icon from './icons/trash-outline.svg';
import { RoutineContext } from './Routines';
export const WorkoutContext = React.createContext({} as Workout);


const RoutineMaker: React.FC = () => {

  const routine = useContext(RoutineContext);
  const [workouts,setWorkouts] = useState<Workout[]>([]);
  const [name, setName] = useState([routine.routineName, false]);

  const createWorkout = function( days: string[]) {
    const name = "Workout" + (workouts.length + 1);
    const newWorkout = new Workout(name, routine.userID, days, []);
    setWorkouts([...workouts, newWorkout]);
  }
  
  function remove(idx: number) {
    var workoutsCopy = workouts;
    workoutsCopy.splice(idx, 1);
    setWorkouts(workoutsCopy)
  }

  function setRoutine(name: any) {
    routine.routineName = name[0];
    routine.workouts = workouts;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Routine Maker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
          <IonButton id="Edit Name" onClick={()=>setName([routine.routineName, true])}></IonButton>
              {name[1] ? <IonInput onIonInput={(e: any) => setName([e, false])}>{name[0]}</IonInput> : <IonLabel>{name[0]}</IonLabel>}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {workouts.map((workout, idx) => {
            return (
              <IonItem key={idx}>
                <WorkoutContext.Provider value={workouts[idx]}>
                <IonLabel>{workout.workoutName}</IonLabel>
                <IonButton routerLink='/EditAWorkout'></IonButton>
                <IonButton id='delete' onClick={() => remove(idx)}>{trash_icon}</IonButton>
                </WorkoutContext.Provider>
              </IonItem>
            )
          })}
        </IonContent>
        <IonButton id="addWorkout" onClick={createWorkout([])} routerLink="/EditAWorkout">+</IonButton>
        <IonButton id="Finish" onClick={() => setRoutine(name)} routerLink="/Routines">Finish</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RoutineMaker;
export function getWorkout() {
  return 
}
