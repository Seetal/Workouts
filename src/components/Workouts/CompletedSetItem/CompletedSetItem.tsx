import styles from "./CompletedSetItem.module.scss";
import { SetType } from "../../../types/SetType";

type Props = {
    set: SetType;
}

const CompletedSetItem = ({ set }: Props) => {
    return (
        <ul key={set.setNumber} className={styles.completedSetItem}>
            <li className={styles.completedSetItem__item}>
                <span className={styles.completedSetItem__label}>Set</span>
                <p className={styles.completedSetItem__value}>{set.setNumber}</p>
            </li>
            <li className={styles.completedSetItem__item}>
                <span className={styles.completedSetItem__label}>Weight</span>
                <p className={styles.completedSetItem__value}>{set.weight}</p>
            </li>
            <li className={styles.completedSetItem__item}>
                <span className={styles.completedSetItem__label}>Reps</span>
                <p className={styles.completedSetItem__value}>{set.reps}</p>
            </li>
        </ul>
    )
}

export default CompletedSetItem;