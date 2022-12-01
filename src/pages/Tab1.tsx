import { IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonRow, IonList, IonGrid, IonCol, IonItem, IonLabel, IonItemDivider } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Routine, Workout, Exercise } from "../routine"
import { getsUsersRoutines, readRoutine } from "../db"
import React, { useState, useEffect } from 'react';
import "./Global.css"

const uid = "KznJACOrQoOeBo4SrZywbPc6KE72"
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const date = new Date()
const colors = new Map<string, string>([
  ["Push", "danger"],
  ["Pull", "success"],
  ["Rest", "primary"],
  ["Other", "medium"]
])
var week: string []
var month: string [][]

const Tab1: React.FC = () => {
  
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

  var dayOfWeekStart = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  var daysInMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()
  var daysInLastMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate()

  if (routine != undefined) {

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
          <IonTitle class="ion-text-center">Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardTitle class="ion-text-center">Somebody's Routine</IonCardTitle>
        </IonCard>
        <IonCard>
          <IonRow class="ion-justify-content-center">
            <IonButton id="prev_button">Prev</IonButton>
            <IonCardTitle id="month_title" class="ion-text-center">{months[date.getMonth()]}</IonCardTitle>
            <IonButton id="next_button">Next</IonButton>
          </IonRow>
          <IonGrid>
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
              <IonCol><IonButton size="small" color={colors.get(month[0][1])}>{month[0][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[1][1])}>{month[1][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[2][1])}>{month[2][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[3][1])}>{month[3][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[4][1])}>{month[4][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[5][1])}>{month[5][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[6][1])}>{month[6][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton size="small" color={colors.get(month[7][1])}>{month[7][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[8][1])}>{month[8][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[9][1])}>{month[9][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[10][1])}>{month[10][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[11][1])}>{month[11][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[12][1])}>{month[12][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[13][1])}>{month[13][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton size="small" color={colors.get(month[14][1])}>{month[14][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[15][1])}>{month[15][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[16][1])}>{month[16][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[17][1])}>{month[17][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[18][1])}>{month[18][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[19][1])}>{month[19][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[20][1])}>{month[20][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton size="small" color={colors.get(month[21][1])}>{month[21][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[22][1])}>{month[22][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[23][1])}>{month[23][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[24][1])}>{month[24][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[25][1])}>{month[25][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[26][1])}>{month[26][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[27][1])}>{month[27][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton size="small" color={colors.get(month[28][1])}>{month[28][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[29][1])}>{month[29][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[30][1])}>{month[30][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[31][1])}>{month[31][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[32][1])}>{month[32][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[33][1])}>{month[33][0]}</IonButton></IonCol>
              <IonCol><IonButton size="small" color={colors.get(month[34][1])}>{month[34][0]}</IonButton></IonCol>
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
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
