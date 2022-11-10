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
    history: HistoryItem[]

    constructor(name:string, id:string, history:HistoryItem[]) {
        this.exerciseName = name;
        this.userID = id;
        this.history = history;
    }
}

export class HistoryItem {
    startDate: string;
    endDate: string;
    sets: Set[];

    constructor(start:string, end:string, sets:Set[]) {
        this.startDate = start;
        this.endDate = end;
        this.sets = sets;
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

const h1 = [new HistoryItem("11/1", "", sets1)]
const h2 = [new HistoryItem("11/1", "", sets2)]
const h3 = [new HistoryItem("11/1", "", sets3)]
const h4 = [new HistoryItem("11/1", "", sets4)]

const e1 = new Exercise("Bench", userID, h1);
const e2 = new Exercise("ShoulderPress", userID, h2);

const e = [e1, e2]

const p1 = new Exercise("Rows", userID, h3)
const p2 = new Exercise("Pull Ups", userID, h4)

const p = [p1, p2]

const w1 = new Workout("Push", userID, ['MON', 'THU'], e)
const w2 = new Workout("Pull", userID, ['TUE', 'FRI'], p)

const w = [w1, w2]
export const example = new Routine("brosplit", userID, w)