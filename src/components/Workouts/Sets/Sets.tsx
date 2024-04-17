import { ExerciseType } from "../../../types/ExerciseType";
import { useContext } from "react";
import { WorkoutsContext } from "../../../context/WorkoutsContext";
import SetItem from "../SetItem/SetItem";
import styles from './Sets.module.scss';

type Props = {
    exercise: ExerciseType;
    workoutId: string;
}

const Sets = ({ exercise, workoutId }: Props) => {

    const { dispatch } = useContext(WorkoutsContext);
    
    const setItems = exercise.sets.map(set => {
        return <SetItem key={set.setNumber} set={set} exerciseId={exercise.id} workoutId={workoutId} />
    })

    const handleAddSet = () => {
        const exerciseData = {
            workoutId: workoutId,
            exerciseId: exercise.id
        }
        dispatch({ type: 'addSet', payload: exerciseData });
    }

    return (
        <>
            {setItems}
            <div className={styles.sets__btnRow}>
                <button className={styles.sets__addBtn} onClick={handleAddSet}>
                    <span className={styles.sets__addIcon}></span> Another Set
                </button>
            </div>
        </>
    )
}

export default Sets;