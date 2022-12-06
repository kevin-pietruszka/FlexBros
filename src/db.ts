import { Exercise, Routine, Workout } from "./routine";
import {getFirestore, collection, query, where, getDocs, addDoc, getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { app } from "./firebase";


const db = getFirestore(app);

/**
 * Function to store if user is premium version in database
 * @param userID string of new userID
 * @returns 1 if successfull
 */
export async function initNewUser(userID:string) {
    const newDoc = doc(db, 'paid', userID);

    await setDoc(newDoc, {paid: false});

    return 1;

}

/**
 * Checks if user is a premium user
 * @param userID String of user id
 * @returns boolean of if premium user
 */
export async function checkPaidUser(userID: string) {
    const userDoc = doc(db, 'paid', userID);

    let tmp: any = await getDoc(userDoc);

    return tmp.data()['paid'] ? true : false;
}

export async function changeToPaidStatus(userID: string, status: boolean) {
    const userDoc = doc(db, 'paid', userID);

    await updateDoc(userDoc, {paid: status});

    return 1;
}


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
    const exerciseQuery = query(exerciseRef, where("user_id", "==", userID), where("exercise_name", "==", exerciseName));

    const exerciseSnap = await getDocs(exerciseQuery);

    if (exerciseSnap.docs[0] === undefined) return;

    const exercise = exerciseSnap.docs[0].data();

    let location = `workouts/${exercise.workout_ref}`
    const workout = await getDoc(doc(db, location));

    if (!workout.exists()) {
        return;
    }
    location = `routines/${workout.data().routine_ref}`;
    const rountine = await getDoc(doc(db, location));
    if (!rountine.exists()) {
        return;
    }

    return {
        'exercise': new Exercise(exercise.exercise_name, exercise.user_id, exercise.baseline, exercise.history),
        'start': rountine.data().start_date,
        'days': workout.data().days
    };
}

/**
 * Updates history in an exercise document
 * @param uid user id
 * @param ename exercise name
 * @param newHistoryMap new history data
 */
export async function updateHistory(uid:string, ename: string, newHistoryMap: any) {
    
    const exerciseRef = collection(db, "exercises");
    const exerciseQuery = query(exerciseRef, where("user_id", "==", uid), where("exercise_name", "==", ename));

    const exerciseSnap = await getDocs(exerciseQuery);
    const exercise = exerciseSnap.docs[0].id;
    
    console.log(exercise);
    
    updateDoc(doc(db, 'exercises', exercise), {
        'history': newHistoryMap
    });
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
    
    return new Routine(routine.routine_name, routine.user_id, routine.start_date, workouts);

}

/**
 * Function to create a routine in a database with the associated workouts and exercises
 * 
 * @param routine_object Object that contains information for making a routine in the database
 * @returns ID of generated document or null if the routine already exists
 */
export async function uploadRoutine(routine: Routine) {

    let x = await getsUsersRoutines(routine.userID);
    if (routine.routineName in x) {
        return null;
    }

    const exerciseCollection = collection(db, "exercises");
    const workoutCollection = collection(db, "workouts");
    const routineCollection = collection(db, "routines");

    const routineDocument = {
        routine_name: routine.routineName,
        start_date: routine.startDate,
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
            
        }
    }

    return routineDoc.id;
}