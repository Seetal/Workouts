import { useParams } from "react-router-dom";
import { useContext } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import CompletedSetItem from "../../components/Workouts/CompletedSetItem/CompletedSetItem";
import styles from './WorkoutSummary.module.scss';
import { getDateOrdinal } from "../../utilities/GetDateOrdinal";

const WorkoutSummary = () => {
    const { savedWorkouts } = useContext(WorkoutsContext);
    const { id } = useParams();
    const currentWorkout = savedWorkouts.find(item => item.id === id);

    const workoutDate = currentWorkout && new Date(currentWorkout.date);
    const dateString = `${workoutDate?.getDate()}${getDateOrdinal(workoutDate?.getDate() as number)} ${workoutDate?.toLocaleString('default', { month: 'long' })}`;

    const pageColor = { '--page-color': 'var(--clr-blue)' } as React.CSSProperties;

    return (
        <main style={pageColor}>
            <h1 className={styles.workoutSummary__title}>Workout Summary - {dateString}</h1>
            <ul className="box-list box-list--single-col">
                {currentWorkout && 
                    currentWorkout.exerciseList.map(exercise => {
                        const id = exercise.id;
                        return (
                            <li>
                                <div className={styles.workoutSummary__item} key={id}>
                                    <h2 className={styles.workoutSummary__exerciseName}>{exercise.name}</h2>
                                    <div className={styles.workoutSummary__inner}>
                                        {exercise.sets.map(set => {
                                            return <CompletedSetItem set={set}></CompletedSetItem>
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