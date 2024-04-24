import { WorkoutType } from "../../../types/WorkoutType";
import styles from './PreviousWorkoutItem.module.scss';
import { getDateOrdinal } from "../../../utilities/GetDateOrdinal";
import { Link } from "react-router-dom";

const PreviousWorkoutItem = ({ date, exerciseList, id }: WorkoutType) => {
    
    const currentDate = new Date(date);
    const currentDay = currentDate.getDate();
    const dateString = `${currentDay}${getDateOrdinal(currentDay)} ${currentDate.toLocaleString('default', { month: 'long' })}`;
    return (
        <Link to={`/workouts/workoutSummary/${id}`} className={styles.prevWorkoutItem}>
            <h3 className={styles.prevWorkoutItem__date}>{dateString}</h3>
            <p className={styles.prevWorkoutItem__exercises}>{exerciseList.map((exercise, i) => {
                return i === exerciseList.length - 1 ? `${exercise.name}` : `${exercise.name}, `;
            })}</p>
        </Link>
    )
}

export default PreviousWorkoutItem;