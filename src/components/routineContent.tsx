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
import { Routine, Workout } from "../routine";

interface contentProps {
    uid: string;
    routine: Routine;
    setRoutine: React.Dispatch<React.SetStateAction<Routine>>;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    setWorkout: React.Dispatch<React.SetStateAction<number>>;
}

const RoutineContent = (props: contentProps) => {
    const addWorkout = () => {
        let tmp = [...props.routine.workouts];
        let newArr = [
            ...tmp,
            new Workout(`Workout ${tmp.length + 1}`, props.uid, [], []),
        ];
        props.setRoutine((routine) => ({ ...routine, workouts: newArr }));
    };

    const deleteWorkout = (idx: number) => {
        let tmp = [...props.routine.workouts];
        tmp.splice(idx, 1);
        props.setRoutine((routine) => ({ ...routine, workouts: tmp }));
    };

    const changeName = (e: any) => {
        let name = e.detail.value;
        props.setRoutine((routine) => ({ ...routine, routineName: name }));
    };
    const changeDate = (e: any) => {
        let date = e.detail.value;
        props.setRoutine((routine) => ({ ...routine, startDate: date }));
    };

    const changeWorkout = (idx: number) => {
        props.setWorkout(idx);
        props.setPage("workout");
    };

    return (
        <IonContent className="ion-padding">
            <IonItem>
                <IonLabel> Routine Name: </IonLabel>
                <IonInput
                    value={props.routine.routineName}
                    onIonChange={changeName}
                ></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel> Start Date: </IonLabel>
                <IonInput
                    placeholder="mm/dd/yyyy"
                    onIonChange={changeDate}
                    type="date"
                ></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel> Workouts </IonLabel>
            </IonItem>
            <IonList>
                {props.routine.workouts.map((workout, idx) => {
                    return (
                        <IonItem>
                            <IonText> {workout.workoutName}</IonText>
                            <IonButtons slot="end">
                                <IonButton onClick={() => changeWorkout(idx)}>
                                    Modify
                                </IonButton>
                                <IonButton onClick={() => deleteWorkout(idx)}>
                                    Delete
                                </IonButton>
                            </IonButtons>
                        </IonItem>
                    );
                })}
            </IonList>
            <IonButton onClick={addWorkout}>Add Workout</IonButton>
        </IonContent>
    );
};

export default RoutineContent;
