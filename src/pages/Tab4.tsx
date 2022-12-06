import { IonCardTitle, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonRow, IonList, IonGrid, IonCol, IonItem, IonLabel, IonItemDivider } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Routine, Workout, Exercise, Set } from "../routine"
import { getsUsersRoutines, readRoutine } from "../db"
import React, { useState, useEffect } from 'react';
import './Tab3.css';
import { chevronForwardCircleOutline } from 'ionicons/icons';
import { setMaxListeners } from 'process';

const Tab3: React.FC = () => {

  const [sets, setSets] = useState<Set[]>([]);
  const [btn, setBtn] = useState(false);

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
            <IonTitle size="large">Rep Name</IonTitle>
            <IonInput placeholder='Enter name'></IonInput>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {sets.map((set, idx) => {
          return (
            <IonItem key={idx}>
              <IonLabel>{`Set + ${(idx + 1)}`}</IonLabel>
              <IonContent id='reps'>{set.reps}</IonContent>
              btn ? <IonInput onIonInput={(e: any) => setReps(idx, e.target.value)} placeholder={set.reps.toString()}></IonInput> : <></>;
              <IonContent id='weight'>{set.weight}</IonContent>
              btn ? <IonInput onIonInput={(e: any) => setWeight(idx, e.target.value)}></IonInput> : <></>;
              <IonButton onClick={() => setBtn(true)}>Modify</IonButton>
            </IonItem>
          )
        })}
        <IonContent ></IonContent>
        </IonContent>
        <IonButton id="addSet" onClick={() => addSet()}></IonButton>
        <IonButton id="Return" routerLink='/tab3'></IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
