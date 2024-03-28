type Set = {
    setNumber: number;
    weight: number;
    reps?: number;
    time?: number;
    isComplete: boolean;
}

export type ExerciseType = {
    name: string;
    sets: Set[];
    id: string;
}