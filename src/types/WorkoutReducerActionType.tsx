import { ExerciseType } from "./ExerciseType";

type AddExercisePayload = {
    newExercise: ExerciseType;
    id: string;
}
type AddSetPayload = {
    workoutId: string;
    exerciseId: string;
}
type UpdateValues = {
    workoutId: string;
    exerciseId: string;
    set: number;
    key: string;
    value: number;
}

export type ActionType = {
    type: 'addWorkout';
    payload: AddExercisePayload;
} | {
    type: 'addExercise';
    payload: AddExercisePayload;
} | {
    type: 'addSet';
    payload: AddSetPayload;
} | {
    type: 'updateValues';
    payload: UpdateValues;
}