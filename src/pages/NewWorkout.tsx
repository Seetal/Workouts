import AddExercise from "../components/Workouts/AddExercise/AddExercise";
import NewExercise from "../components/Workouts/NewExercise/NewExercise";
import ExerciseItem from "../components/Workouts/ExerciseItem/ExerciseItem";
import { useState } from "react";
import { ExerciseType } from "../types/ExerciseType";

const NewWorkout = () => {
    const [ newExercise, setNewExercise ] = useState(false);
    const [ exercises, setExercises ] = useState<ExerciseType[]>([]);

    const handleAdd = () => {
        setNewExercise(true);
    }

    const loggedExercises = exercises.map(exercise => {
        return <ExerciseItem key={exercise.id} exercise={exercise}></ExerciseItem>
    });

    const handleAddExercise = (exerciseToAdd: ExerciseType) => {
        console.log(exerciseToAdd);
        setNewExercise(false);
        setExercises(prevState => {
            return [
                ...prevState, exerciseToAdd
            ]
        })
    }

    const pageColor = { '--page-color': 'var(--clr-blue)' } as React.CSSProperties;
    return (
        <main style={pageColor}>
            {loggedExercises}
            {newExercise && <NewExercise handleAddExercise={handleAddExercise} />}
            <AddExercise handleAdd={handleAdd} />
        </main>
    )
}

export default NewWorkout;