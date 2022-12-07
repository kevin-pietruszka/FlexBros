import { IonCardTitle, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonRow, IonList, IonGrid, IonCol, IonItem, IonLabel, IonItemDivider } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Routine, Workout, Exercise } from "../routine"
import { getsUsersRoutines, readRoutine, checkPaidUser } from "../db"
import React, { useState, useEffect, useContext } from 'react';
import './Tab2.css';
import { remove } from 'ionicons/icons';
import trash_icon from './icons/trash-outline.svg';
import { auth } from '../firebase';
export const RoutineContext = React.createContext({} as Routine);


const Routines: React.FC = () => {

  const [routines, setRoutines] = useState<Routine[]>([]);
  const [UserID, setUserID] = useState("");
  const [paid, setPaid] = useState(false);

  useEffect(() => {

    if (auth.currentUser != null) {

        setUserID(auth.currentUser.uid);
        
    } else {

        setUserID('KznJACOrQoOeBo4SrZywbPc6KE72');
        
    }
    
  }, []);

  getsUsersRoutines(UserID).then( (res: any) => {setRoutines(res)} ).catch( (error) => {});
  

  function createRoutine() {
    const name = "Routine" + (routines.length + 1);
    const newRoutine = new Routine(name, UserID, Date.now.toString(), []);
    setRoutines([...routines, newRoutine]);
  }

  function remove(idx: number) {
    var routinesCopy = routines;
    routinesCopy.splice(idx, 1);
    setRoutines(routinesCopy);
  }

  checkPaidUser(UserID).then( (res: boolean) => {setPaid(res)}).catch( (error) => {});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Routines</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Routines List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {routines.map((routine, idx) => {
          return (
            <IonItem key={idx}>
              <RoutineContext.Provider value={routines[idx]}>
                <IonLabel>{routine.routineName}</IonLabel>
                <IonButton routerLink='/RoutineMaker'></IonButton>
                <IonButton id='delete' onClick={() => remove(idx)}>{trash_icon}</IonButton>
              </RoutineContext.Provider>
            </IonItem>
          )
        })}
        </IonContent>
        {paid ? <IonButton id='AddRoutines' onClick={() => createRoutine()}></IonButton> : <IonButton id='UnpaidUser' alert='Become a paid user to add more routines!'></IonButton>}
      </IonContent>
    </IonPage>
  );
};

export default Routines;
export function getWorkout() {
  return 
}