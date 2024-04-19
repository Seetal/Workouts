import { WorkoutType } from "../../../types/WorkoutType";
import styles from './PreviousWorkoutItem.module.scss';

const PreviousWorkoutItem = ({ date }: WorkoutType) => {
    return (
        <div>
            {date}
        </div>
    )
}

export default PreviousWorkoutItem;