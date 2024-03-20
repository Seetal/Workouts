import styles from './TimerDetails.module.scss';

type Props = {
    currentRound: number; 
    rounds: number; 
    currentSet: number; 
    sets: number;
}

const IntervalDetails = ({currentRound, rounds, currentSet, sets}: Props ) => {
    return (
        <dl className={styles.timerDetails}>
            <div className={styles.timerDetails__item}>
                <dt className={styles.timerDetails__label}>Round</dt>
                <dd className={styles.timerDetails__value}>{currentRound}/{rounds}</dd>
            </div>
            <div className={styles.timerDetails__item}>
                <dt className={styles.timerDetails__label}>Set</dt>
                <dd className={styles.timerDetails__value}>{currentSet}/{sets}</dd>
            </div>
        </dl>
    )
}

export default IntervalDetails;