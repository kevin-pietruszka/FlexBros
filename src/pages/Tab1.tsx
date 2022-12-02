import { IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { Routine } from "../routine"
import { getsUsersRoutines, readRoutine } from "../db"
import React, { useState, useEffect } from 'react';
import "./Global.css"
import { useHistory } from 'react-router-dom';

const uid = "A4A2aPnIz2VH39FsbGkPwZnzYM43"
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const colors = new Map<string, string>([
  ["Push", "danger"],
  ["Pull", "success"],
  ["Rest", "primary"],
  ["Other", "medium"]
])
var date : Date
var week : string []
var month : string [][]
var routine_ : Routine

const Tab1: React.FC = () => {
  let history = useHistory()
  
  const [routines, setRoutines] = useState<string[]>([])
  const [routineIndex, setRoutineIndex] = useState<number>(0)
  const [routine, setRoutine] = useState<Routine>() //in the useState function 
  const [monthOffset, setMonthOffset] = useState<number>(0)

  useEffect( () => {

    // Call getUserRoutines for string array and have a dropdown use this array for selection
    getsUsersRoutines(uid).then((result) => setRoutines(result)).catch((err) => console.log(err))

  }, [])

  useEffect( () => {

    const getRoutine = (routine:any) => {
      return routine
    }

    readRoutine(routines[routineIndex], uid).then((result) => setRoutine(getRoutine(result))).catch((err) => console.log(err))
    
  }, [routines])

  function ChooseDay (day: string) {
    date = new Date(monthYear.getFullYear(), monthYear.getMonth(), parseInt(day))
    history.push('/CalendarDay')
  }

  var monthYear = new Date()
  monthYear.setMonth(monthYear.getMonth()+monthOffset)

  var dayOfWeekStart = new Date(monthYear.getFullYear(), monthYear.getMonth(), 1).getDay()
  var daysInMonth = new Date(monthYear.getFullYear(), monthYear.getMonth()+1, 0).getDate()
  var daysInLastMonth = new Date(monthYear.getFullYear(), monthYear.getMonth(), 0).getDate()

  if (routine != undefined) {
    routine_ = routine
    console.log(routines)

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

  
    month = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]

    for (let i = 0; i < dayOfWeekStart; i++) {
      month[i] = []
      month[i].push((daysInLastMonth-dayOfWeekStart+1+i).toString())
      month[i].push("Other")
      month[i].push('true')
    }

    for (let i = 1; i <= daysInMonth; i++) {
      month[dayOfWeekStart-1+i] = []
      month[dayOfWeekStart-1+i].push((i).toString())
      month[dayOfWeekStart-1+i].push(week[new Date(monthYear.getFullYear(), monthYear.getMonth(), i).getDay()])
      month[i].push('false')
    }
  
    for (let i = dayOfWeekStart+daysInMonth; i < 35; i++) {
      month[i] = []
      month[i].push((i-daysInMonth-dayOfWeekStart+1).toString())
      month[i].push("Other")
      month[i].push('true')
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
          <IonCardTitle class="ion-text-center">
            <IonSelect interface='popover' class='select_text_color' placeholder={routines[routineIndex]}>
              {routines.length >= 1 && <IonSelectOption onClick={() => setRoutineIndex(0)} class="ion-text-center" value={routines[0]}>{routines[0]}</IonSelectOption>}
              {routines.length >= 2 && <IonSelectOption onClick={() => setRoutineIndex(1)} class="ion-text-center" value={routines[1]}>{routines[1]}</IonSelectOption>}
              {routines.length >= 3 && <IonSelectOption onClick={() => setRoutineIndex(2)} class="ion-text-center" value={routines[2]}>{routines[2]}</IonSelectOption>}
              {routines.length >= 4 && <IonSelectOption onClick={() => setRoutineIndex(3)} class="ion-text-center" value={routines[3]}>{routines[3]}</IonSelectOption>}
            </IonSelect>
          </IonCardTitle>
        </IonCard>
        <IonCard>
          <IonGrid class="ion-text-center">
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol><IonButton onClick={() => {setMonthOffset(monthOffset-1)}}>Prev</IonButton></IonCol>
            <IonCol>
              <IonRow><IonCardTitle id="month_title">{months[monthYear.getMonth()]}</IonCardTitle></IonRow>
              <IonRow><IonCardTitle id="year_title">{monthYear.getFullYear()}</IonCardTitle></IonRow>
            </IonCol>
            <IonCol><IonButton onClick={() => {setMonthOffset(monthOffset+1)}}>Next</IonButton></IonCol>
            <IonCol></IonCol>
            <IonCol></IonCol>
          </IonRow>
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
              <IonCol><IonButton onClick={() => ChooseDay(month[0][0])} size='small' color={colors.get(month[0][1])} disabled={(month[0][2] === 'true')}>{month[0][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[1][0])} size='small' color={colors.get(month[1][1])} disabled={(month[1][2] === 'true')}>{month[1][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[2][0])} size='small' color={colors.get(month[2][1])} disabled={(month[2][2] === 'true')}>{month[2][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[3][0])} size='small' color={colors.get(month[3][1])} disabled={(month[3][2] === 'true')}>{month[3][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[4][0])} size='small' color={colors.get(month[4][1])} disabled={(month[4][2] === 'true')}>{month[4][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[5][0])} size='small' color={colors.get(month[5][1])} disabled={(month[5][2] === 'true')}>{month[5][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[6][0])} size='small' color={colors.get(month[6][1])} disabled={(month[6][2] === 'true')}>{month[6][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton onClick={() => ChooseDay(month[7][0])} size='small' color={colors.get(month[7][1])} disabled={(month[7][2] === 'true')}>{month[7][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[8][0])} size='small' color={colors.get(month[8][1])} disabled={(month[8][2] === 'true')}>{month[8][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[9][0])} size='small' color={colors.get(month[9][1])} disabled={(month[9][2] === 'true')}>{month[9][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[10][0])} size='small' color={colors.get(month[10][1])} disabled={(month[10][2] === 'true')}>{month[10][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[11][0])} size='small' color={colors.get(month[11][1])} disabled={(month[11][2] === 'true')}>{month[11][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[12][0])} size='small' color={colors.get(month[12][1])} disabled={(month[12][2] === 'true')}>{month[12][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[13][0])} size='small' color={colors.get(month[13][1])} disabled={(month[13][2] === 'true')}>{month[13][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton onClick={() => ChooseDay(month[14][0])} size='small' color={colors.get(month[14][1])} disabled={(month[14][2] === 'true')}>{month[14][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[15][0])} size='small' color={colors.get(month[15][1])} disabled={(month[15][2] === 'true')}>{month[15][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[16][0])} size='small' color={colors.get(month[16][1])} disabled={(month[16][2] === 'true')}>{month[16][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[17][0])} size='small' color={colors.get(month[17][1])} disabled={(month[17][2] === 'true')}>{month[17][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[18][0])} size='small' color={colors.get(month[18][1])} disabled={(month[18][2] === 'true')}>{month[18][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[19][0])} size='small' color={colors.get(month[19][1])} disabled={(month[19][2] === 'true')}>{month[19][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[20][0])} size='small' color={colors.get(month[20][1])} disabled={(month[20][2] === 'true')}>{month[20][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton onClick={() => ChooseDay(month[21][0])} size='small' color={colors.get(month[21][1])} disabled={(month[21][2] === 'true')}>{month[21][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[22][0])} size='small' color={colors.get(month[22][1])} disabled={(month[22][2] === 'true')}>{month[22][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[23][0])} size='small' color={colors.get(month[23][1])} disabled={(month[23][2] === 'true')}>{month[23][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[24][0])} size='small' color={colors.get(month[24][1])} disabled={(month[24][2] === 'true')}>{month[24][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[25][0])} size='small' color={colors.get(month[25][1])} disabled={(month[25][2] === 'true')}>{month[25][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[26][0])} size='small' color={colors.get(month[26][1])} disabled={(month[26][2] === 'true')}>{month[26][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[27][0])} size='small' color={colors.get(month[27][1])} disabled={(month[27][2] === 'true')}>{month[27][0]}</IonButton></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonButton onClick={() => ChooseDay(month[28][0])} size='small' color={colors.get(month[28][1])} disabled={(month[28][2] === 'true')}>{month[28][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[29][0])} size='small' color={colors.get(month[29][1])} disabled={(month[29][2] === 'true')}>{month[29][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[30][0])} size='small' color={colors.get(month[30][1])} disabled={(month[30][2] === 'true')}>{month[30][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[31][0])} size='small' color={colors.get(month[31][1])} disabled={(month[31][2] === 'true')}>{month[31][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[32][0])} size='small' color={colors.get(month[32][1])} disabled={(month[32][2] === 'true')}>{month[32][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[33][0])} size='small' color={colors.get(month[33][1])} disabled={(month[33][2] === 'true')}>{month[33][0]}</IonButton></IonCol>
              <IonCol><IonButton onClick={() => ChooseDay(month[34][0])} size='small' color={colors.get(month[34][1])} disabled={(month[34][2] === 'true')}>{month[34][0]}</IonButton></IonCol>
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

export function getChosenDate() {return date}
export function getLoadedRoutine() {return routine_}
export default Tab1;
