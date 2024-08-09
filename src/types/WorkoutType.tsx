import { ExerciseType } from "./ExerciseType"

export type WorkoutType = {
    date: string;
    id: string;
    previousId: string;
    previousExercises: ExerciseType[] | null;
    inProgress: boolean;
    exerciseList: ExerciseType[];
}