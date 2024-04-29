import AddExercise from "../../components/Workouts/AddExercise/AddExercise";
import NewExercise from "../../components/Workouts/NewExercise/NewExercise";
import ContentBlock from "../../components/Generic/ContentBlock/ContentBlock";
import { useState, useContext } from "react";
import { ExerciseType } from "../../types/ExerciseType";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import { WorkoutType } from "../../types/WorkoutType";
import Sets from "../../components/Workouts/Sets/Sets";
import { nanoid } from "nanoid";
import styles from "./NewWorkout.module.scss";


// On clicking 'New Workout' there is a generated id on page, this goes to a new workout page with :id based on date and time. Use id from page params to search state object, if doesnt exist then show add new exercise panel.

const NewWorkout = () => {

    const { state, dispatch } = useContext(WorkoutsContext);
    const [ workoutDetails, setWorkoutDetails ] = useState<WorkoutType>({
        id: nanoid(),
        date: '2024-03-30',
        exerciseList: []
    });
    const [ newExercise, setNewExercise ] = useState(false);

    const handleAdd = () => {
        setNewExercise(true);
    }

    const handleAddSet = (id: string) => {
        const currentWorkout = {
            ...workoutDetails, 
            exerciseList: workoutDetails.exerciseList.map(exercise => {
                if(exercise.id == id) {
                    return { ...exercise, sets: [...exercise.sets, 
                        {
                            setNumber: exercise.sets.length + 1,
                            weight: 0,
                            reps: 0,
                            isComplete: false
                        }
                    ]}
                } else {
                    return exercise
                }
            })
        }
        dispatch({ type: 'addSet', payload: currentWorkout }); 
        setWorkoutDetails(currentWorkout);
    }

    const handleAddNewExercise = (exerciseToAdd: ExerciseType) => {
        const currentWorkout = {
            ...workoutDetails, 
            exerciseList: [...workoutDetails.exerciseList, exerciseToAdd]
        }
        workoutDetails.exerciseList.length === 0 ? 
        dispatch({ type: 'addWorkout', payload: currentWorkout }) : 
        dispatch({ type: 'updateWorkout', payload: currentWorkout });
        setWorkoutDetails(currentWorkout);
        setNewExercise(false);
    }

    const loggedExercises = workoutDetails.exerciseList.map(exercise => {
        const id = exercise.id;
        return (
            <ContentBlock key={exercise.id}>
                <h2 className={styles.newWorkout__name}>{exercise.name}</h2>
                <Sets exercise={exercise}></Sets>
                <div className={styles.newWorkout__btnRow}>
                    <button className={styles.newWorkout__addBtn} onClick={() => handleAddSet(id)}>
                        <span className={styles.newWorkout__addIcon}></span> Another Set
                    </button>
                </div>
            </ContentBlock>
        )
    });

    const pageColor = { '--page-color': 'var(--clr-blue)' } as React.CSSProperties;
    return (
        <main style={pageColor}>
            {loggedExercises}
            {newExercise && <NewExercise handleAddNewExercise={handleAddNewExercise} />}
            <AddExercise handleAdd={handleAdd} />
        </main>
    )
}

export default NewWorkout;