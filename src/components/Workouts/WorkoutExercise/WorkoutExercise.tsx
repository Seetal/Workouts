import { useState } from 'react';
import styles from './WorkoutExercise.module.scss';
import WorkoutHistory from '../WorkoutHistory/WorkoutHistory';
import Sets from '../Sets/Sets';
import { ExerciseType } from '../../../types/ExerciseType';

type Props = {
	exercise: ExerciseType;
	previousExercise: ExerciseType | null;
	workoutId: string;
	previousId: string;
}

const WorkoutExercise = ({ exercise, workoutId, previousId, previousExercise }: Props) => {
	const [ isHistoryVisible, setIsHistoryVisible ] = useState(false);

	const handleShowHistory = () => {
        setIsHistoryVisible(prevState => !prevState);
    }

	return (
		<li key={exercise.id} className="box-list__item">
			<div className={styles.workoutExercise__item}>
				<h2 className={styles.workoutExercise__exerciseName}>{exercise.name}</h2>
				{previousId && 
					<button 
						className={`${styles.workoutExercise__historyBtn} ${isHistoryVisible ? styles.showHistory : ''}`} 
						onClick={handleShowHistory} 
						aria-controls={`history-${exercise.id}`}
						aria-expanded={isHistoryVisible}>
					<span className="sr-only">History</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.1 58.6" className={styles.workoutExercise__historyIcon}><path d="M26.6 7.4V0L13.3 11.3l13.3 11.3v-7.2c9.3.5 16.7 8.2 16.7 17.6 0 9.8-7.9 17.7-17.7 17.7C15.8 50.7 8 42.8 8 33v-.2H0v.2c0 14.1 11.5 25.6 25.6 25.6S51.1 47.1 51.1 33c0-13.8-10.9-25-24.5-25.6z" /></svg>
					</button>
				}
				<Sets exercise={exercise} workoutId={workoutId}></Sets>
			</div>
			{
				previousId && 
				<WorkoutHistory id={`history-${exercise.id}`} previousExercise={previousExercise} isVisible={isHistoryVisible} />
			}
		</li>
	)
};

export default WorkoutExercise;
