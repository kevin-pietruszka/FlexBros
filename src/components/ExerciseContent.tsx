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
import { Routine, Set } from "../routine";

interface contentProps {
    routine: Routine;
    setRoutine: React.Dispatch<React.SetStateAction<Routine>>;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    workoutIndex: number;
    exerciseIndex: number;
    uid: string;
}
const ExerciseContent = (props: contentProps) => {
    const changeName = (e: any) => {
        let name = e.detail.value;
        let copy = [...props.routine.workouts];
        let exercise = copy[props.workoutIndex].exercises[props.exerciseIndex];
        exercise.exerciseName = name;

        props.setRoutine((routine) => ({ ...routine, workouts: copy }));
    };

    const addSet = () => {
        let copy = [...props.routine.workouts];
        let exercise = copy[props.workoutIndex].exercises[props.exerciseIndex];
        exercise.baseline = [...exercise.baseline, new Set(0, 0)];

        props.setRoutine((routine) => ({ ...routine, workouts: copy }));
    };

    const changeReps = (e:any, index: number) => {
        let value = e.detail.value;

        let copy = [...props.routine.workouts];
        let set = copy[props.workoutIndex].exercises[props.exerciseIndex].baseline[index];

        set.reps = value;
        props.setRoutine((routine) => ({ ...routine, workouts: copy }));
    }

    const changeWeight = (e:any, index: number) => {

        console.log('Changing weight');
        let value = e.detail.value;

        let copy = [...props.routine.workouts];
        let set = copy[props.workoutIndex].exercises[props.exerciseIndex].baseline[index];

        set.weight = value;
        props.setRoutine((routine) => ({ ...routine, workouts: copy }));
    }

    const backButton = () => {
        props.setPage('workout')
    }

    return (
        <IonContent className="ion-padding">
            <IonItem>
                <IonLabel> Exercise Name: </IonLabel>
                <IonInput
                    value={
                        props.routine.workouts[props.workoutIndex].exercises[
                            props.exerciseIndex
                        ].exerciseName
                    }
                    onIonChange={changeName}
                ></IonInput>
            </IonItem>
            <IonList>
                {props.routine.workouts[props.workoutIndex].exercises[
                    props.exerciseIndex
                ].baseline.map((set, idx) => {
                    return (
                        <IonList>
                            
                            <IonLabel> Set {idx + 1} </IonLabel>{" "}
                            
                            <IonItem>
                                <IonLabel> Reps: </IonLabel>
                                <IonInput type='number' min={0} value={set.reps} onIonChange={(e) => changeReps(e, idx)}> </IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel> Weight(lbs):  </IonLabel>
                                <IonInput type='number' min={0} step='5' value={set.weight} onIonChange={(e) => changeWeight(e, idx)}> </IonInput>
                            </IonItem>
                        </IonList>
                    );
                })}
            </IonList>
            <IonButton onClick={backButton}> Back </IonButton>
            <IonButton onClick={addSet}> Add Set </IonButton>
        </IonContent>
    );
};

export default ExerciseContent;
