import { useContext, useState, useEffect } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import NewExercise from "../../components/Workouts/NewExercise/NewExercise";
import AddExercise from "../../components/Workouts/AddExercise/AddExercise";
import ContentBlock from "../../components/Generic/ContentBlock/ContentBlock";
import Sets from "../../components/Workouts/Sets/Sets";
import { ExerciseType } from "../../types/ExerciseType";
import styles from './Workout.module.scss';
import { addWorkoutToState, addExerciseToState } from "../../context/WorkoutsHelpers";

const Workout = () => {

    const { savedWorkouts, setSavedWorkouts, periodKeysData, setPeriodKeysData} = useContext(WorkoutsContext);
    const [ isNewExercisePanelVisible, setIsNewExercisePanelVisible ] = useState(false);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const workoutId = urlParams.get('id');

    const handleShowNewExercisePanel = () => {
        setIsNewExercisePanelVisible(true);
    }

    const currentWorkout = savedWorkouts.find(workoutItem => workoutItem.id === workoutId);

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
        let updatetedStateData = [];
        if (currentWorkout) {
            updatetedStateData = addExerciseToState(exerciseData, savedWorkouts);
        } else {
            updatetedStateData = addWorkoutToState(exerciseData, savedWorkouts);
            const currentDate = new Date();
            const currentMonthsStorageKey = `workouts_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
            if ((periodKeysData.keyData.length === 0) || ((periodKeysData.keyData.length > 0) && (periodKeysData.keyData[0].periodkey !== currentMonthsStorageKey))) {
                const newKeyData = {
                    periodkey: currentMonthsStorageKey, month: currentDate.toLocaleString('default', { month: 'long' })
                }
                const newLocalKeyData = [
                    newKeyData, ...periodKeysData.keyData
                ]
                localStorage.setItem('workoutPeriodKeys', JSON.stringify(newLocalKeyData));
                setPeriodKeysData(prevState => {
                    return { keyData: [newKeyData, ...prevState.keyData], currentShowing: prevState.currentShowing + 1 };
                })
            }
        }
        setSavedWorkouts(updatetedStateData);
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