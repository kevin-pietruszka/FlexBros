import { IonCardTitle, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonRow, IonList, IonGrid, IonCol, IonItem, IonLabel, IonItemDivider } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Routine, Workout, Exercise} from "../routine"
import { getsUsersRoutines, readRoutine } from "../db"
import React, { useState, useEffect, useContext } from 'react';
import './Tab3.css';
import { auth } from '../firebase';
import trash_icon from './icons/trash-outline.svg';
import { WorkoutContext } from './RoutineMaker';
export const ExerciseContext = React.createContext({} as Exercise);

const EditAWorkout: React.FC = () => {

  const workout = useContext(WorkoutContext);
  const [exercises,setExercises] = useState<Exercise[]>([]);
  const [userID, setUserID] = useState("");
  const [name, setName] = useState([workout.workoutName, false]);
  
  
  //create the workout
  //add the workout to the array

  useEffect(() => {

    if (auth.currentUser != null) {

        setUserID(auth.currentUser.uid);
        
    } else {

        setUserID('KznJACOrQoOeBo4SrZywbPc6KE72');
        
    }
    
  }, []);

  function newExercise() {
    const val = exercises.length + 1;
    setExercises([...exercises, new Exercise("Exercise " + val, userID, [], {})]);
  }

  function remove(idx: number) {
    var exCopy = exercises;
    exCopy.splice(idx, 1);
    setExercises(exCopy);
  }

  function setWorkout(name: any) {
    workout.workoutName = name[0];
    workout.exercises = exercises;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit A Workout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
          <IonButton id="Edit Name" onClick={()=>setName([workout.workoutName, true])}></IonButton>
              {name[1] ? <IonInput onIonInput={(e: any) => setName([e, false])}>{name[0]}</IonInput> : <IonLabel>{name[0]}</IonLabel>}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {exercises.map((exercise, idx) => {
          return (
            <IonItem key={idx}>
              <ExerciseContext.Provider value={exercises[idx]}>
                <IonLabel>{exercise.exerciseName}</IonLabel>
                <IonButton routerLink='/EditAnExercise'></IonButton>
                <IonButton id='delete' onClick={() => remove(idx)}>{trash_icon}</IonButton>
              </ExerciseContext.Provider>
            </IonItem>
          )
        })}
        </IonContent>
        <IonButton id="addExercise" onClick={() => newExercise()}>+</IonButton>
        <IonButton id="Return" onClick={() => setWorkout(name)} routerLink="/RoutineMaker"></IonButton> : <></>
      </IonContent>
    </IonPage>
  );
};

export default EditAWorkout;
