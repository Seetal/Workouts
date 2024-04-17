import { ExerciseType } from "./ExerciseType"

export type WorkoutType = {
    date: string;
    id: string;
    exerciseList: ExerciseType[];
}