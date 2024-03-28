import { ExerciseType } from "./ExerciseType"

export type WorkoutType = {
    name: string;
    date: string;
    exerciseList: ExerciseType[];
}