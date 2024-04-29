import { ExerciseType } from "./ExerciseType"

export type WorkoutType = {
    date: string;
    id: string;
    inProgress: boolean;
    exerciseList: ExerciseType[];
}