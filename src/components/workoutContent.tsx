import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonButton,
    IonCard,
    IonInput,
    IonItem,
    IonText,
    IonModal,
    IonButtons,
    InputChangeEventDetail,
    IonLabel,
} from "@ionic/react";
import { useEffect } from "react";
import { Exercise, Routine } from "../routine";
import "../pages/Global.css";

interface contentProps {
    routine: Routine;
    setRoutine: React.Dispatch<React.SetStateAction<Routine>>;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    workoutIndex: number;
    setExercise: React.Dispatch<React.SetStateAction<number>>;
    uid: string;
}

const WorkoutContent = (props: contentProps) => {
    const possibleDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const changeName = (e: any) => {
        let name = e.detail.value;
        let copy = [...props.routine.workouts];
        let workout = copy[props.workoutIndex];
        workout.workoutName = name;

        props.setRoutine((routine) => ({ ...routine, workouts: copy }));
    };

    const addDay = (idx: number) => {
        let copy = [...props.routine.workouts];
        let day = possibleDays[idx];
        let days = copy[props.workoutIndex].days;

        if (days.includes(day)) {
            let remove = days.indexOf(day);
            days.splice(remove, 1);
        } else {
            days.push(possibleDays[idx]);
        }

        props.setRoutine((routine) => ({ ...routine, workouts: copy }));
    };

    const daysString = () => {
        let days = props.routine.workouts[props.workoutIndex].days;
        return days.join(",");
    };

    const deleteExercise = (idx: number) => {
        let tmp = [...props.routine.workouts];
        let workout = tmp[props.workoutIndex];
        let exercises = workout.exercises;
        exercises.splice(idx, 1);
        props.setRoutine((routine) => ({ ...routine, workouts: tmp }));
    };

    const changeExercise = (idx: number) => {
        props.setExercise(idx);
        props.setPage("exercise");
    }

    const backButton = () => {

        props.setPage('routine');

    }

    const addWorkout = () => {
        let tmp = [...props.routine.workouts];
        let workout = tmp[props.workoutIndex];
        let exercises = workout.exercises;

        let newArr = [
            ...exercises,
            new Exercise(`Exercise ${exercises.length + 1}`, props.uid, [], {}),
        ];

        workout.exercises = newArr;

        props.setRoutine((routine) => ({ ...routine, workouts: tmp }));
    }

    return (
        <IonContent className="ion-padding">
            <IonItem>
                <IonLabel> Workout Name: </IonLabel>
                <IonInput
                    value={props.routine.workouts[props.workoutIndex].workoutName}
                    onIonChange={changeName}
                ></IonInput>
            </IonItem>
            <IonItem>
                <IonText> Days of the week: {daysString()}</IonText>
            </IonItem>
            <IonItem>
                <IonButtons>
                    {possibleDays.map((day, idx) => {
                        return (
                            <IonButton onClick={() => addDay(idx)}>
                                {day}
                            </IonButton>
                        );
                    })}
                </IonButtons>
            </IonItem>
            <IonItem>
                <IonLabel> Exercises </IonLabel>
            </IonItem>
            <IonList>
                {props.routine.workouts[props.workoutIndex].exercises.map(
                    (exercise, idx) => {

                        return (
                            <IonItem>
                                <IonText> {exercise.exerciseName}</IonText>
                                <IonButtons slot="end">
                                    <IonButton
                                        onClick={() => changeExercise(idx)}
                                    >
                                        Modify
                                    </IonButton>
                                    <IonButton
                                        onClick={() => deleteExercise(idx)}
                                    >
                                        Delete
                                    </IonButton>
                                </IonButtons>
                            </IonItem>
                        );
                    }
                )}
            </IonList>
            <IonButton onClick={backButton}> Back </IonButton>
            <IonButton onClick={addWorkout}> Add exercise </IonButton>
        </IonContent>
    );
};

export default WorkoutContent;
