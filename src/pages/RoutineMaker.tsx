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
import { uploadRoutine } from "../db";
import { Routine } from "../routine";

interface makerProps {
    uid: string;
}

const RoutineMaker = (props: makerProps) => {

    const formatDate = (date: Date) => {

        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();

        return `${m}/${d}/${y}`
    }


    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState("routine");
    const [routine, setRoutine] = useState<Routine>(
        new Routine("Routine Name", props.uid, formatDate(new Date()), [])
    );
    const [workout, setWorkout] = useState(-1);
    const [exercise, setExercise] = useState(-1);

    useEffect(() => {
        return () => {};
    }, [routine, page, isOpen, workout, exercise]);

    const onClose = () => {
        const tmp = new Routine("Routine Name", props.uid, formatDate(new Date()), []);
        setRoutine(tmp);
        setPage("routine");
        setIsOpen(false);
    };

    const finishRoutine = () => {
        setPage("submitting");

        uploadRoutine(routine)
            .then((res) => {
                console.log(res);
                onClose();
            })
            .catch((err) => {
                setPage("routine");
            });
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
                        finishRoutine={finishRoutine}
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
            </IonModal>
        </IonItem>
    );
};

export default RoutineMaker;
