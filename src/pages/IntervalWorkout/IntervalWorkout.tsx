import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { IntervalsContext } from "../../context/IntervalsContext";
import Timer from "../../components/Intervals/Timer/Timer";
import { generateTimingArray } from "./IntervalWorkout.helpers";
import styles from './IntervalWorkout.module.scss';
import { IntervalType } from "../../types/IntervalType";
import ContentBlock from "../../components/Generic/ContentBlock/ContentBlock";

const IntervalWorkout = () => {

    const [ isFinished, setIsFinished ] = useState(false);
    const { savedIntervals, handleUpdateInterval } = useContext(IntervalsContext);
    const { id } = useParams();

    const currentInterval = savedIntervals.find(intervalItem => intervalItem.id === id) as IntervalType;

    const timingArray = generateTimingArray(currentInterval);

    const finishedHandler = () => {
        setIsFinished(true);
        handleUpdateInterval(currentInterval);
    }
    const pageColors = { '--page-color': 'var(--clr-green)', '--page-color-secondary': 'var(--clr-green-secondary)' } as React.CSSProperties;
    return (
        <main style={pageColors}>
            <div className={styles.intervalWorkout}>
                {!isFinished &&
                    <>
                        <h1 className={styles.intervalWorkout__title}>{currentInterval?.name}</h1>
                        <Timer 
                            timingArray={timingArray} 
                            sets={currentInterval?.sets} 
                            rounds={currentInterval?.rounds} 
                            setIsFinished={finishedHandler} 
                        />
                    </>
                }
                {isFinished &&
                    <ContentBlock isCentered={true}>
                        <h2 className="title-1">Well done!</h2>
                        <p>Workout complete.</p>
                    </ContentBlock>
                }
            </div>
        </main>
    )
}

export default IntervalWorkout;