import { useContext, useState, useEffect } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import NewExercise from "../../components/Workouts/NewExercise/NewExercise";
import AddExercise from "../../components/Workouts/AddExercise/AddExercise";
import ContentBlock from "../../components/Generic/ContentBlock/ContentBlock";
import Sets from "../../components/Workouts/Sets/Sets";
import { ExerciseType } from "../../types/ExerciseType";
import styles from './Workout.module.scss';

const Workout = () => {

    const { state, dispatch } = useContext(WorkoutsContext);
    const [ isNewExercisePanelVisible, setIsNewExercisePanelVisible ] = useState(false);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const workoutId = urlParams.get('id');

    const handleShowNewExercisePanel = () => {
        setIsNewExercisePanelVisible(true);
    }

    const currentWorkout = state.find(workoutItem => workoutItem.id === workoutId);

    useEffect(() => {
        if (!currentWorkout) {
            setIsNewExercisePanelVisible(true);
        }
    }, [currentWorkout])

    const handleAddNewExercise = (exerciseToAdd: ExerciseType) => {
        const exerciseData = {
            newExercise: exerciseToAdd,
            id: workoutId
        }
        currentWorkout ? dispatch({ type: 'addExercise', payload: exerciseData }):
        dispatch({ type: 'addWorkout', payload: exerciseData }) ;
        setIsNewExercisePanelVisible(false);
    }

    const pageColor = { '--page-color': 'var(--clr-blue)' } as React.CSSProperties;

    return (
        <main style={pageColor}>
            {currentWorkout && 
                currentWorkout.exerciseList.map(exercise => {

                    const id = exercise.id;
                    return (
                        <ContentBlock key={id}>
                            <h2 className={styles.workout__exerciseName}>{exercise.name}</h2>
                            <Sets exercise={exercise} workoutId={workoutId}></Sets>
                        </ContentBlock>
                    )
                })
            }

            {isNewExercisePanelVisible && <NewExercise handleAddNewExercise={handleAddNewExercise} />}
            <AddExercise handleAdd={handleShowNewExercisePanel} />
        </main>
    )
}

export default Workout;