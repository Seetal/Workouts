import { useContext, useState, useEffect } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import NewExercise from "../../components/Workouts/NewExercise/NewExercise";
import AddExercise from "../../components/Workouts/AddExercise/AddExercise";
import ContentBlock from "../../components/Generic/ContentBlock/ContentBlock";
import WorkoutExercise from "../../components/Workouts/WorkoutExercise/WorkoutExercise";
import CountdownTimer from "../../components/Workouts/CountdownTimer/CountdownTimer";
import { ExerciseType } from "../../types/ExerciseType";
import { addWorkoutToState, addExerciseToState, markAsComplete } from "../../context/WorkoutsHelpers";
import { useNavigate } from "react-router-dom";

const Workout = () => {

    const { savedWorkouts, setSavedWorkouts, updatePeriodKeys} = useContext(WorkoutsContext);
    const [ isNewExercisePanelVisible, setIsNewExercisePanelVisible ] = useState(false);
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const workoutId: string = urlParams.get('id') as string;

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
        let updatedStateData = [];
        if (currentWorkout) {
            const exerciseData = {
                newExercise: exerciseToAdd,
                id: workoutId
            }
            updatedStateData = addExerciseToState(exerciseData, savedWorkouts);
        } else {
            const exerciseData = {
                newExercises: [exerciseToAdd],
                id: workoutId
            }
            updatedStateData = addWorkoutToState(exerciseData, savedWorkouts, '', null);
            updatePeriodKeys();
            
        }
        setSavedWorkouts(updatedStateData);
        setIsNewExercisePanelVisible(false);
    }
    const handleComplete = () => {
        if(currentWorkout) {
            const updatedStateData = markAsComplete(currentWorkout.id, savedWorkouts);
            setSavedWorkouts(updatedStateData);
            navigate("/workouts");
        }
    }
    const handleCloseNewExercisePanel = () => {
        setIsNewExercisePanelVisible(false);
    }

    const pageColors = { '--page-color': 'var(--clr-blue)', '--page-color-secondary': 'var(--clr-blue-secondary)' } as React.CSSProperties;

    return (
        <main style={pageColors}>
            <ul className="box-list box-list--single-col">
                {currentWorkout && 
                    currentWorkout.exerciseList.map(exercise => {
                        const previousExercise = currentWorkout.previousExercises ? currentWorkout.previousExercises.find(item => item.name === exercise.name) as ExerciseType : null;
                        return (
                            <WorkoutExercise key={exercise.id} exercise={exercise} previousId={currentWorkout.previousId} workoutId={workoutId} previousExercise={previousExercise} />
                        )
                    })
                }
            </ul>

            {isNewExercisePanelVisible && <NewExercise handleAddNewExercise={handleAddNewExercise} hideNewExercisePanel={handleCloseNewExercisePanel} />}
            {!isNewExercisePanelVisible && 
                <>
                <AddExercise handleAdd={handleShowNewExercisePanel} />
                <ContentBlock isCentered={true}>
                    <button className="button button--alt" onClick={handleComplete}>Mark workout as complete</button>
                </ContentBlock>
                </>
            }
            <CountdownTimer />
        </main>
    )
}

export default Workout;