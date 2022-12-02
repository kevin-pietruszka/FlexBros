import { IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonRow, IonList, IonGrid, IonCol, IonItem, IonLabel, IonItemDivider } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Routine, Workout, Exercise } from "../routine"
import { getsUsersRoutines, readRoutine } from "../db"
import React, { useState, useEffect } from 'react';
import "./Global.css"
import { useHistory } from 'react-router-dom';

const uid = "KznJACOrQoOeBo4SrZywbPc6KE72"
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const date = new Date()
const colors = new Map<string, string>([
  ["Push", "danger"],
  ["Pull", "success"],
  ["Rest", "primary"],
  ["Other", "medium"]
])
var week : string []
var month : string [][]
var routine_ : Routine

const Tab1: React.FC = () => {
  let history = useHistory()
  
  const [routines, setRoutines] = useState<string[]>([]);
  const [routine, setRoutine] = useState<Routine>(); //in the useState function 

  useEffect( () => {

    // Call getUserRoutines for string array and have a dropdown use this array for selection
    getsUsersRoutines(uid).then((result) => setRoutines(result)).catch((err) => console.log(err));

  }, [])

  useEffect( () => {

    const getRoutine = (routine:any) => {
      return routine
    }

    readRoutine(routines[0], uid).then((result) => setRoutine(getRoutine(result))).catch((err) => console.log(err));
    
  }, [routines])

  function GoToDay (day: string) {
    history.push({
      pathname: '/CalendarDay',
      state: day
    })
  }

  var dayOfWeekStart = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  var daysInMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()
  var daysInLastMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate()

  if (routine != undefined) {
    routine_ = routine

    // get workout routine for a week
    week = ['','','','','','','']
    routine.workouts.forEach((workout) => {
      workout.days.forEach((day) => {
        if (day == 'SUN') {
          week[0] = workout.workoutName
        } else if (day == 'MON') {
          week[1] = workout.workoutName
        } else if (day == 'TUE') {
          week[2] = workout.workoutName
        } else if (day == 'WED') {
          week[3] = workout.workoutName
        } else if (day == 'THU') {
          week[4] = workout.workoutName
        } else if (day == 'FRI') {
          week[5] = workout.workoutName
        } else if (day == 'SAT') {
          week[6] = workout.workoutName
        }
      })
    })

    for (let i = 1; i <= daysInMonth; i++) {
      month[dayOfWeekStart-1+i] = []
      month[dayOfWeekStart-1+i].push((i).toString())
      month[dayOfWeekStart-1+i].push(week[new Date(date.getFullYear(), date.getMonth(), i).getDay()])
    }

  } else if (month == undefined) {
  
    month = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
  
    for (let i = 0; i < dayOfWeekStart; i++) {
      month[i].push((daysInLastMonth-dayOfWeekStart+1+i).toString())
      month[i].push("Other")
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      month[dayOfWeekStart-1+i].push((i).toString())
      month[dayOfWeekStart-1+i].push("Rest")
    }
  
    for (let i = dayOfWeekStart+daysInMonth; i < 35; i++) {
      month[i].push((i-daysInMonth-dayOfWeekStart+1).toString())
      month[i].push("Other")
    }

  }
    
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">FlexBros</IonTitle>
        </IonToolbar>
      </IonHeader>
      {routine != undefined && <IonContent fullscreen>
        <IonCard>
          <IonCardTitle class="ion-text-center">{routine.routineName}</IonCardTitle>
        </IonCard>
        <IonCard>
          <IonRow class="ion-justify-content-center">
            <IonButton>Prev</IonButton>
            <IonCardTitle class="ion-text-center">{months[date.getMonth()]}</IonCardTitle>
            <IonButton>Next</IonButton>
          </IonRow>
          <IonGrid class="ion-text-center">
            <IonRow>
              <IonCol>Sun</IonCol>
              <IonCol>Mon</IonCol>
              <IonCol>Tue</IonCol>
              <IonCol>Wed</IonCol>
              <IonCol>Thu</IonCol>
              <IonCol>Fri</IonCol>
              <IonCol>Sat</IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton onClick={() => GoToDay(month[0][0])} size="small" color={colors.get(month[0][1])} disabled={(month[0][2] === 'true')}>{month[0][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[1][0])} size="small" color={colors.get(month[1][1])} disabled={(month[1][2] === 'true')}>{month[1][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[2][0])} size="small" color={colors.get(month[2][1])} disabled={(month[2][2] === 'true')}>{month[2][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[3][0])} size="small" color={colors.get(month[3][1])} disabled={(month[3][2] === 'true')}>{month[3][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[4][0])} size="small" color={colors.get(month[4][1])} disabled={(month[4][2] === 'true')}>{month[4][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[5][0])} size="small" color={colors.get(month[5][1])} disabled={(month[5][2] === 'true')}>{month[5][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[6][0])} size="small" color={colors.get(month[6][1])} disabled={(month[6][2] === 'true')}>{month[6][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton onClick={() => GoToDay(month[7][0])} size="small" color={colors.get(month[7][1])} disabled={(month[7][2] === 'true')}>{month[7][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[8][0])} size="small" color={colors.get(month[8][1])} disabled={(month[8][2] === 'true')}>{month[8][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[9][0])} size="small" color={colors.get(month[9][1])} disabled={(month[9][2] === 'true')}>{month[9][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[10][0])} size="small" color={colors.get(month[10][1])} disabled={(month[10][2] === 'true')}>{month[10][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[11][0])} size="small" color={colors.get(month[11][1])} disabled={(month[11][2] === 'true')}>{month[11][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[12][0])} size="small" color={colors.get(month[12][1])} disabled={(month[12][2] === 'true')}>{month[12][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[13][0])} size="small" color={colors.get(month[13][1])} disabled={(month[13][2] === 'true')}>{month[13][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton onClick={() => GoToDay(month[14][0])} size="small" color={colors.get(month[14][1])} disabled={(month[14][2] === 'true')}>{month[14][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[15][0])} size="small" color={colors.get(month[15][1])} disabled={(month[15][2] === 'true')}>{month[15][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[16][0])} size="small" color={colors.get(month[16][1])} disabled={(month[16][2] === 'true')}>{month[16][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[17][0])} size="small" color={colors.get(month[17][1])} disabled={(month[17][2] === 'true')}>{month[17][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[18][0])} size="small" color={colors.get(month[18][1])} disabled={(month[18][2] === 'true')}>{month[18][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[19][0])} size="small" color={colors.get(month[19][1])} disabled={(month[19][2] === 'true')}>{month[19][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[20][0])} size="small" color={colors.get(month[20][1])} disabled={(month[20][2] === 'true')}>{month[20][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton onClick={() => GoToDay(month[21][0])} size="small" color={colors.get(month[21][1])} disabled={(month[21][2] === 'true')}>{month[21][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[22][0])} size="small" color={colors.get(month[22][1])} disabled={(month[22][2] === 'true')}>{month[22][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[23][0])} size="small" color={colors.get(month[23][1])} disabled={(month[23][2] === 'true')}>{month[23][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[24][0])} size="small" color={colors.get(month[24][1])} disabled={(month[24][2] === 'true')}>{month[24][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[25][0])} size="small" color={colors.get(month[25][1])} disabled={(month[25][2] === 'true')}>{month[25][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[26][0])} size="small" color={colors.get(month[26][1])} disabled={(month[26][2] === 'true')}>{month[26][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[27][0])} size="small" color={colors.get(month[27][1])} disabled={(month[27][2] === 'true')}>{month[27][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton onClick={() => GoToDay(month[28][0])} size="small" color={colors.get(month[28][1])} disabled={(month[28][2] === 'true')}>{month[28][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[29][0])} size="small" color={colors.get(month[29][1])} disabled={(month[29][2] === 'true')}>{month[29][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[30][0])} size="small" color={colors.get(month[30][1])} disabled={(month[30][2] === 'true')}>{month[30][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[31][0])} size="small" color={colors.get(month[31][1])} disabled={(month[31][2] === 'true')}>{month[31][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[32][0])} size="small" color={colors.get(month[32][1])} disabled={(month[32][2] === 'true')}>{month[32][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[33][0])} size="small" color={colors.get(month[33][1])} disabled={(month[33][2] === 'true')}>{month[33][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => GoToDay(month[34][0])} size="small" color={colors.get(month[34][1])} disabled={(month[34][2] === 'true')}>{month[34][0]}</IonButton></IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
        <IonCard>
          <IonItem>
            <IonLabel>Push</IonLabel>
            <IonButton slot="end" color={colors.get('Push')}>Color</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Pull</IonLabel>
            <IonButton slot="end" color={colors.get('Pull')}>Color</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Rest</IonLabel>
            <IonButton slot="end" color={colors.get('Rest')}>Color</IonButton>
          </IonItem>
        </IonCard>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>}
    </IonPage>
  );
};

export function getLoadedRoutine() {return routine_}
export default Tab1;
