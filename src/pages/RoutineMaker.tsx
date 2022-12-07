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
import { useState, useEffect } from "react";
import ExerciseContent from "../components/ExerciseContent";
import RoutineContent from "../components/routineContent";
import WorkoutContent from "../components/workoutContent";
import { Routine } from "../routine";

interface makerProps {
    uid: string;
}

const RoutineMaker = (props: makerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState("routine");
    const [routine, setRoutine] = useState<Routine>(
        new Routine("Routine Name", props.uid, "", [])
    );
    const [workout, setWorkout] = useState(-1);
    const [exercise, setExercise] = useState(-1);

    useEffect(() => {
        console.log("Changed routine");

        return () => {};
    }, [routine]);

    const onClose = () => {
        const tmp = new Routine("Routine Name", props.uid, "", []);
        setRoutine(tmp);
        setPage("routine");
        setIsOpen(false);
    };

    return (
        <IonItem>
            <IonItem button onClick={() => setIsOpen(true)}>
                <IonText> Build a routine </IonText>
            </IonItem>
            <IonModal isOpen={isOpen} backdropDismiss={false}>
                <IonHeader>
                    <IonToolbar>
                        <IonItem>
                            <IonTitle> Routine Builder </IonTitle>
                            <IonButton slot="end" onClick={onClose}>
                                Close
                            </IonButton>
                        </IonItem>
                    </IonToolbar>
                </IonHeader>
                {page === "routine" && (
                    <RoutineContent
                        uid={props.uid}
                        routine={routine}
                        setRoutine={setRoutine}
                        setPage={setPage}
                        setWorkout={setWorkout}
                    ></RoutineContent>
                )}
                {page === "workout" && (
                    <WorkoutContent
                        uid={props.uid}
                        routine={routine}
                        setRoutine={setRoutine}
                        setPage={setPage}
                        workoutIndex={workout}
                        setExercise={setExercise}
                    ></WorkoutContent>
                )}
                {page === "exercise" && (
                    <ExerciseContent
                        uid={props.uid}
                        routine={routine}
                        setRoutine={setRoutine}
                        setPage={setPage}
                        workoutIndex={workout}
                        exerciseIndex={exercise}
                    ></ExerciseContent>
                )}
                <IonButton onClick={() => console.log(routine)}>
                    {" "}
                    Debug{" "}
                </IonButton>
            </IonModal>
        </IonItem>
    );
};

export default RoutineMaker;
