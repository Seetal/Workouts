import { useParams } from "react-router-dom";
import { useContext } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import { useNavigate } from "react-router-dom";
import { addWorkoutToState } from "../../context/WorkoutsHelpers";
import CompletedSetItem from "../../components/Workouts/CompletedSetItem/CompletedSetItem";
import TitleBlock from "../../components/Generic/TitleBlock/TitleBlock";
import styles from './WorkoutSummary.module.scss';
import { getDateOrdinal } from "../../utilities/GetDateOrdinal";
import { nanoid } from "nanoid";
import { WorkoutType } from "../../types/WorkoutType";

const WorkoutSummary = () => {
    const { savedWorkouts, setSavedWorkouts, updatePeriodKeys } = useContext(WorkoutsContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const currentWorkout = savedWorkouts.find(item => item.id === id) as WorkoutType;
    const workoutDate = currentWorkout && new Date(currentWorkout.date);
    const dateString = `${workoutDate?.getDate()}${getDateOrdinal(workoutDate?.getDate() as number)} ${workoutDate?.toLocaleString('default', { month: 'long' })}`;
    const pageTitle = `Workout Summary - ${dateString}`;
    const pageColor = { '--page-color': 'var(--clr-blue)', '--page-color-secondary': 'var(--clr-blue-secondary)' } as React.CSSProperties;
    console.log(currentWorkout)

    const repeatWorkoutId = nanoid();

    const handleRepeatWorkout = () => {
        const exercisesToRepeat = currentWorkout?.exerciseList.map(exercise => {
            return { 
                name: exercise.name,
                id: nanoid(),
                sets: [{
                    setNumber: 1,
                    weight: 0,
                    reps: 0
                }]
            }
        })
        const exercisesData = {
            newExercises: exercisesToRepeat,
            id: repeatWorkoutId
        }
        const updatedStateData = addWorkoutToState(exercisesData, savedWorkouts, id as string, currentWorkout.exerciseList);
        updatePeriodKeys();
        setSavedWorkouts(updatedStateData);
        navigate(`/workouts/workout?id=${repeatWorkoutId}`);
    }


    return (
        <main style={pageColor}>
            <TitleBlock title={pageTitle}>
                <button onClick={handleRepeatWorkout} className="button bg-blue">
                    Repeat this workout
                </button>
            </TitleBlock>
            <ul className="box-list box-list--single-col">
                {currentWorkout && 
                    currentWorkout.exerciseList.map(exercise => {
                        const id = exercise.id;
                        return (
                            <li key={id}>
                                <div className={styles.workoutSummary__item} key={id}>
                                    <h2 className={styles.workoutSummary__exerciseName}>{exercise.name}</h2>
                                    <div className={styles.workoutSummary__inner}>
                                        {exercise.sets.map(set => {
                                            const newKey = `${id}${set.setNumber}`;
                                            return <CompletedSetItem key={newKey} set={set}></CompletedSetItem>
                                        })}
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}

export default WorkoutSummary;