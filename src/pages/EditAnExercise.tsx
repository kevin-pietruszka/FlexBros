import {IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonLabel} from '@ionic/react';
import { Set } from "../routine"
import React, { useState, useContext } from 'react';
import './EditAWorkout';
import { ExerciseContext } from './EditAWorkout';
import trash_icon from './icons/trash-outline.svg';

const EditAnExercise: React.FC = () => {

  const exercise = useContext(ExerciseContext);
  const [sets, setSets] = useState<Set[]>([]);
  const [btn, setBtn] = useState(false);
  const [name, setName] = useState([exercise.exerciseName, false]);

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
    setBtn(false)
  }

  function remove(idx: number) {
    var setsCopy = sets
    setsCopy.splice(idx, 1);
    setSets(setsCopy);
  }

  function setExercise(name: any) {
    exercise.baseline = sets;
    exercise.exerciseName = name[0];
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Name of Exercise</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButton id="Edit Name" onClick={()=>setName([exercise.exerciseName, true])}></IonButton>
              {name[1] ? <IonInput onIonInput={(e: any) => setName([e, false])}>{name[0]}</IonInput> : <IonLabel>{name[0]}</IonLabel>}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {sets.map((set, idx) => {
          return (
            <IonItem key={idx}>
              <IonLabel>{`Set + ${(idx + 1)}`}</IonLabel>
              <IonContent id='reps'>{set.reps}</IonContent>
              {btn ? <IonInput onIonInput={(e: any) => setReps(idx, e.target.value)} placeholder={set.reps.toString()}></IonInput> : <></>};
              <IonContent id='weight'>{set.weight}</IonContent>
              {btn ? <IonInput onIonInput={(e: any) => setWeight(idx, e.target.value)}></IonInput> : <></>};
              <IonButton onClick={() => setBtn(true)}>Modify</IonButton>
              <IonButton onClick={() => remove(idx)}>{trash_icon}</IonButton>
            </IonItem>
          )
        })}
        <IonContent ></IonContent>
        </IonContent>
        <IonButton id="addSet" onClick={() => addSet()}>+</IonButton>
        <IonButton id="Return" routerLink='/EditAWorkout' onClick={setExercise(name)}></IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditAnExercise;
