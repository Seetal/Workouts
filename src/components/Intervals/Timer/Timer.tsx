import { useEffect, useState } from "react";
import styles from './Timer.module.scss';

type TimingArray = {
    name: string;
    time: number;
    currentTime: number;
    round: number;
    set: number;
    curve: number;
    currentCurve: number;
}

const Timer = ({timingArray}: {timingArray: TimingArray[]}) => {
    const [intervalId, setIntervalId] = useState<typeof setTimeout | null>(null);
    const [currentTimingArrayItem, setCurrentTimingArrayItem] = useState(0);
    const [currentTime, setCurrentTime] = useState(timingArray[0]);
    const [finished, setFinished] = useState(false);
    const [started, setStarted] = useState(false);

    const decrementTime = () => {
        setCurrentTime((prevTime) => {
            return {
                ...prevTime, currentTime: prevTime.currentTime - 1, currentCurve: prevTime.currentCurve - prevTime.curve
            }
        })
    };
    console.log(timingArray);
    const createTimeout = () => {
        setIntervalId(setInterval(decrementTime, 1000));
    }
    const handleStart = () => {
        setStarted(true);
        createTimeout();
    }
    useEffect(() => {
        const clearCurrentInterval = () => {
            clearInterval(intervalId);
        }
        if(currentTime.currentTime === 0 && currentTime.name === 'Cooldown') {
            clearCurrentInterval();
            setFinished(true);
        } else if(currentTime.currentTime === -1) {
            clearCurrentInterval();
            setCurrentTimingArrayItem(currentTimingArrayItem + 1);
            setCurrentTime(timingArray[currentTimingArrayItem + 1]);
            createTimeout();
        }
    }, [currentTime, intervalId])

    const curveStyle = {
        'stroke-dashoffset': `${currentTime.currentCurve}`,
        transition: `${currentTime.currentTime === currentTime.time ? "" : "stroke-dashoffset .5s ease, opacity .3s ease .7s"}`,
        opacity: `${currentTime.currentTime === 0 ? "0" : "1"}`
    }

    return (
        <>
            <div className={styles.timer}>
                <svg
                    className={styles.timer__svg}
                    width="330"
                    height="330">
                    <circle
                        className={styles.timer__circleBack}
                        stroke-width="16"
                        r="156"
                        cx="165"
                        cy="165"/>
                    <circle
                        style={curveStyle}
                        className={styles.timer__circle}
                        stroke-width="16"
                        r="156"
                        cx="165"
                        cy="165"/>
                    
                </svg>
                <div className={styles.timer__inner}>
                    {!started && <button className="button button--large bgGreen" onClick={handleStart}>Start</button>}
                    {started && 
                        <>
                            <p className={styles.timer__time}>{currentTime.currentTime}</p>
                            <p>{currentTime.name}</p>
                        </>
                    }
                </div>
            </div>
            
            <p>Round {currentTime.round}</p>
            <p>Set {currentTime.set}</p>
            {finished && <p>Finished</p>}
        </>
    )
}

export default Timer;