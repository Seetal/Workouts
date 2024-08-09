import { useContext } from "react";
import { WorkoutsContext } from "../../../context/WorkoutsContext";
import styles from "./SetItem.module.scss";
import { updateValuesToState } from "../../../context/WorkoutsHelpers";

type Props = {
    set: {
        setNumber: number;
        weight: number;
        reps?: number;
    }
    exerciseId: string;
    workoutId: string;
}

const SetItem = ({ set, exerciseId, workoutId }: Props) => {

    const { savedWorkouts, setSavedWorkouts } = useContext(WorkoutsContext);

    const exerciseDataTemplate = {
        workoutId: workoutId,
        exerciseId: exerciseId,
        set: set.setNumber,
    }

    const handleUpdateValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: number = Number(e.target.value);
        const key: string = e.target.name;
        const exerciseData = {
            ...exerciseDataTemplate,
            key: key,
            value: value
        }
        const updatedStateData = updateValuesToState(exerciseData, savedWorkouts);
        setSavedWorkouts(updatedStateData);
    }

    return (
        <ul key={set.setNumber} className={styles.setItem}>
            <li className={styles.setItem__item}>
                <span className={styles.setItem__label}>Set</span>
                <p className={styles.setItem__value}>{set.setNumber}</p>
            </li>
            <li className={styles.setItem__item}>
                <label className={styles.setItem__label} htmlFor={`weight_${set}`}>Weight</label>
                <input 
                    type="number" 
                    name="weight" 
                    id={`weight_${set}`} 
                    inputMode="decimal"
                    className={styles.setItem__input} 
                    value={Number(set.weight).toString()} 
                    onChange={handleUpdateValues}
                />
            </li>
            <li className={styles.setItem__item}>
                <label className={styles.setItem__label} htmlFor={`reps_${exerciseId}`}>Reps</label>
                <input 
                    type="number" 
                    name="reps" 
                    id={`reps_${exerciseId}`} 
                    inputMode="decimal"
                    className={styles.setItem__input} 
                    value={Number(set.reps).toString()} 
                    onChange={handleUpdateValues}
                />
            </li>
        </ul>
    )
}

export default SetItem;