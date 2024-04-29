import styles from './InProgressWorkout.module.scss';
import { WorkoutType } from '../../../types/WorkoutType';
import { Link } from 'react-router-dom';

type Props = {
    workoutDetails: WorkoutType;
}

const InProgressWorkout = ({workoutDetails}: Props) => {
    return (
        <Link className={styles.inProgressWorkout} to={`/workouts/workout?id=${workoutDetails.id}`}>
            <h3 className={styles.inProgressWorkout__title}>Workout in progress</h3>
            <p className={styles.inProgressWorkout__exercises}>{workoutDetails.exerciseList.map((exercise, i) => {
                return i === workoutDetails.exerciseList.length - 1 ? `${exercise.name}` : `${exercise.name}, `;
            })}</p>
        </Link>
    )
}

export default InProgressWorkout;