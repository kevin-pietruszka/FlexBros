import { Exercise, Routine, Set, Workout } from "./routine";
import {getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { app } from "./firebase";


const db = getFirestore(app);

/**
 * Function to return list of Routine names associated with an Uset
 * @param userID string of user id in firebase
 * @returns String array of routine names
 */
export async function getsUsersRoutines(userID: string) {
    const routineRef = collection(db, "routines");
    const routineQuery = query(routineRef, where("user_id", "==", userID));

    const routines: string[] = [];

    const routineSnap = await getDocs(routineQuery);
    routineSnap.forEach( (doc) => {
        routines.push(doc.data().routine_name);
    });

    return routines;
}

/**
 * Function to return a list of Exercise objects needed 
 * for displaying the statistics of the data
 * @param userID string of userid in firebase
 * @returns String of array of exercise names
 */
export async function getUserExercises(userID: string) {
    const exerciseRef = collection(db, "exercises");

    const exerciseQuery = query(exerciseRef, where("user_id", "==", userID));

    const exercises: string[] = [];

    const exerciseSnap = await getDocs(exerciseQuery);
    exerciseSnap.forEach( (doc) => {
        exercises.push(doc.data().exercise_name);
    });

    return exercises;
}

/**
 * Function to get the history of an exercise
 * @param userId string of userid in firebase
 * @param exerciseName string of exercisename in firebase
 */
export async function getExerciseHistory(userID: string, exerciseName: string) {

    const exerciseRef = collection(db, "exercises");
    const exerciseQuery = query(exerciseRef, where("user_id", "==", userID), where("routine_name", "==", exerciseName));

    const exerciseSnap = await getDocs(exerciseQuery);
    let hist = null;
    exerciseSnap.forEach( (doc) => {
        hist = doc.data().history;
    });
    return hist;
}

/**
 * Function to find the routine of the user
 * @param userId String representing the ID of the user in the Firebase
 * @returns Routine data
 */
export async function readRoutine(routineName: string, userID: string) {

    let x = await getsUsersRoutines(userID);
    if (routineName in x) {
        return null;
    }

    // Get routine collection
    const exerciseCollection = collection(db, "exercises");
    const workoutCollection = collection(db, "workouts");
    const routineCollection = collection(db, "routines");


    const routineQuery = query(routineCollection, where("user_id", "==", userID), where("routine_name", "==", routineName));

    const routineSnap = await getDocs(routineQuery);

    const userRoutine = routineSnap.docs[0];
    const routineID = userRoutine.id;
    const routine = userRoutine.data();

    let workouts: Workout[] = []
    const workoutQuery = query(workoutCollection, where("routine_ref", "==", routineID));
    const workoutSnap = await getDocs(workoutQuery);

    for (const workoutDocument of workoutSnap.docs) {
        
        let exercises: Exercise[] = [];
        const exerciseQuery = query(exerciseCollection, where("workout_ref", "==", workoutDocument.id));
        const exerciseSnap = await getDocs(exerciseQuery);

        for (const exerciseDocument of exerciseSnap.docs) {
            
            const excerise = exerciseDocument.data();

            exercises.push(new Exercise(excerise.exercise_name, excerise.user_id, excerise.baseline, excerise.history));
        }

        const workout = workoutDocument.data();
        workouts.push(new Workout(workout.workout_name, workout.user_id, workout.days, exercises));
    }
    
    return new Routine(routine.routine_name, routine.user_id, workouts);

}

/**
 * Function to create a routine in a database with the associated workouts and exercises
 * 
 * @param routine_object Object that contains information for making a routine in the database
 * @returns ID of generated document
 */
export async function uploadRoutine(routine: Routine) {

    const exerciseCollection = collection(db, "exercises");
    const workoutCollection = collection(db, "workouts");
    const routineCollection = collection(db, "routines");

    const routineDocument = {
        routine_name: routine.routineName,
        user_id: routine.userID
    }
    let routineDoc = await addDoc(routineCollection, routineDocument);
    let routineID = routineDoc.id;

    for (const workout of routine.workouts) {

        const workoutDocument = {
            workout_name: workout.workoutName,
            days: workout.days,
            user_id:workout.userID,
            routine_ref: routineID
        }

        let workoutDoc = await addDoc(workoutCollection, workoutDocument);
        let workoutID = workoutDoc.id;

        for (const exercise of workout.exercises) {

            let baseline = [];
            for (const set of exercise.baseline) {
                baseline.push( {"reps": set.reps, "weight": set.weight} )
            }

            const exerciseDocument = {
                exercise_name: exercise.exerciseName,
                baseline: baseline,
                history: exercise.history,
                user_id: exercise.userID,
                workout_ref: workoutID
            }

            let exerciseDoc = await addDoc(exerciseCollection, exerciseDocument);
            console.log(exerciseDoc.id);
        }
    }

    return routineDoc.id;
}