import { IonCardTitle, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonRow, IonList, IonGrid, IonCol, IonItem, IonLabel, IonItemDivider } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Routine, Workout, Exercise} from "../routine"
import { getsUsersRoutines, readRoutine } from "../db"
import React, { useState, useEffect } from 'react';
import './Tab3.css';
import { chevronForwardCircleOutline } from 'ionicons/icons';
import { auth } from '../firebase';
import trash_icon from './icons/trash-outline.svg';

const Tab3: React.FC = (createWorkout) => {

  const [exercises,setExercises] = useState<Exercise[]>([]);
  const [userID, setUserID] = useState("");
  
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
    setExercises([...exercises, new Exercise("Enter name", userID, [], {})]);
  }

  var exerciseBtnClicked = false;
  function exerciseButtonClicked() {
      exerciseBtnClicked = true;
  }

  function remove(idx: number) {
    var exCopy = exercises;
    exCopy[idx] = [];
    setExercises(exCopy);
  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Exercises</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Workout Name</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {exercises.map((exercise, idx) => {
          return (
            <IonItem key={idx}>
              <IonLabel>{exercise.exerciseName}</IonLabel>
              <IonButton routerLink='/tab4'></IonButton>
              <IonButton id='delete' onClick={() => remove(idx)}>{trash_icon}</IonButton>
            </IonItem>
          )
        })}
        </IonContent>
        <IonContent>
          {exerciseBtnClicked ? (
            <></>
          )}
        </IonContent>
        <IonButton id="addExercise" onClick={() => newExercise()}></IonButton>
        <IonButton id="Finish" onClick={createWorkout('name', 'userId', 7)}></IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
