import { useParams } from "react-router-dom";
import { useContext } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import ContentBlock from "../../components/Generic/ContentBlock/ContentBlock";
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
            <ContentBlock>
                <h1 className={styles.workoutSummary__title}>Workout Summary - {dateString}</h1>
            </ContentBlock>
            {currentWorkout && 
                currentWorkout.exerciseList.map(exercise => {
                    const id = exercise.id;
                    return (
                        <ContentBlock key={id}>
                            <h2 className={styles.workoutSummary__exerciseName}>{exercise.name}</h2>
                            {exercise.sets.map(set => {
                                return <CompletedSetItem set={set}></CompletedSetItem>
                            })}
                        </ContentBlock>
                    )
                })
            }
        </main>
    )
}

export default WorkoutSummary;