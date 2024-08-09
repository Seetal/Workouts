import styles from './WorkoutHistory.module.scss';
import { ExerciseType } from '../../../types/ExerciseType';

type Props = {
	previousExercise: ExerciseType | null;
	isVisible: boolean;
	id: string;
}

const WorkoutHistory = ({ previousExercise, isVisible, id }: Props) => {

	const setItems = previousExercise?.sets.map(set => {
		return (
			<li key={set.setNumber} className={styles.workoutHistory__item}>
				Set <strong>{set.setNumber}</strong> - Weight <strong>{set.weight}</strong> - Reps <strong>{set.reps}</strong>
			</li>
		)
	})

	return (
		<div id={id} className={`${styles.workoutHistory} ${isVisible && styles.showHistory}`}>
			<h2 className={styles.workoutHistory__title}>Previous Workout</h2>
			<ul className={styles.workoutHistory__list}>
				{setItems}
			</ul>
		</div>
	)
};

export default WorkoutHistory;
