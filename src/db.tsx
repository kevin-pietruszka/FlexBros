import {app} from "./firebase";
import {getFirestore} from "firebase/firestore";


const db = getFirestore(app);

export async function readRoutine(userId: string) {

    return 0;
}


/**
 * Function to create a routine in a database with the associated workouts and exercises
 * 
 * @param routine_object Object that contains information for making a routine in the database
 * @returns 0 if routine is create, 1 if there is an error
 */
export async function createRoutine(routine_object: any) {

    return 0;
}
