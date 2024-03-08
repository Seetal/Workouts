import { useParams } from "react-router-dom";
import { useContext } from "react";
import { IntervalsContext } from "../../context/IntervalsContext";
import Timer from "../../components/Intervals/Timer/Timer";
import { generateTimingArray } from "./IntervalWorkout.helpers";
import styles from './IntervalWorkout.module.scss';

const IntervalWorkout = () => {

    const { savedIntervals } = useContext(IntervalsContext);
    const { id } = useParams();

    const currentInterval = savedIntervals.find(intervalItem => intervalItem.id === id);

    const timingArray = generateTimingArray(currentInterval);

    return (
        <>
            <h1 className={styles.intervalWorkout__title}>{currentInterval?.name}</h1>
            <Timer timingArray={timingArray} />
        </>
    )
}

export default IntervalWorkout;