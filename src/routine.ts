export class Routine {

    routineName:string;
    userID:string;
    workouts:Workout[];

    constructor (name:string, userID:string, workouts: Workout[]) {
        this.routineName = name;
        this.userID = userID;
        this.workouts = workouts;
    }
}

export class Workout {

    workoutName:string;
    userID:string;
    days:string[];
    exercises:Exercise[];

    constructor (name:string, userID:string, days:string[],exercises: Exercise[]) {
        this.workoutName = name;
        this.userID = userID;
        this.days = days;
        this.exercises = exercises;
    }
}

export class Exercise {

    exerciseName:string;
    userID:string;
    baseline: Set[];
    history: any;

    constructor(name:string, id:string, baseline:Set[], history: any) {
        this.exerciseName = name;
        this.userID = id;
        this.baseline = baseline;
        this.history = history;
    }
}


export class Set {
    reps: number;
    weight: number;

    constructor(reps:number, weight:number) {
        this.reps = reps;
        this.weight = weight;
    }
}


const userID = "KznJACOrQoOeBo4SrZywbPc6KE72"

const sets1 = [new Set(8, 105), new Set(8, 105), new Set(8, 105)]
const sets2 = [new Set(8, 70), new Set(8, 70), new Set(8, 70)]
const sets3 = [new Set(8, 80), new Set(8, 80), new Set(8, 80)]
const sets4 = [new Set(8, 100), new Set(8, 100), new Set(8, 100)]

const e1 = new Exercise("Bench", userID, sets1, {});
const e2 = new Exercise("ShoulderPress", userID, sets2, {});

const e = [e1, e2];

const p1 = new Exercise("Rows", userID, sets3, {});
const p2 = new Exercise("Pull Ups", userID, sets4, {});

const p = [p1, p2];

const w1 = new Workout("Push", userID, ['MON', 'THU'], e);
const w2 = new Workout("Pull", userID, ['TUE', 'FRI'], p);

const w = [w1, w2];
export const example = new Routine("Gerneric Routine", userID, w);