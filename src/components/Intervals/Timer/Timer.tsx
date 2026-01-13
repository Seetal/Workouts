import { useEffect, useState, useContext, useRef } from "react";
import styles from './Timer.module.scss';
import { getTimerColor } from "../../../pages/IntervalWorkout/IntervalWorkout.helpers";
import TimerDetails from "../TimerDetails/TimerDetails";
import PauseTimer from "../PauseTimer/PauseTimer";
import { TimingArray } from "../../../types/TimingArrayType";
import { ModalContext } from "../../Generic/Modal/ModalContext";
// @ts-expect-error - ignore missing type definitions
import useSound from 'use-sound';
import beepSfx from '../../../assets/sounds/beep.mp3';
import boopSfx from '../../../assets/sounds/boop.mp3';

type Props = {
    timingArray: TimingArray[]; 
    rounds: number; 
    sets: number;
    setIsFinished: () => void;
}

const Timer = ({timingArray, rounds, sets, setIsFinished}: Props) => {
    const {handleFadeOn} = useContext(ModalContext);
    const [intervalId, setIntervalId] = useState<number>();
    const [currentTimeDetails, setCurrentTimeDetails] = useState({
        currentArrayItem: 0,
        currentTimeItem: timingArray[0]
    })
    const [status, setStatus] = useState({ started: false, paused: false });
    const timerRef = useRef<HTMLDivElement>(null);
    
    const [playBeep] = useSound(beepSfx);
    const [playBoop] = useSound(boopSfx);


    const decrementTime = () => {
        setCurrentTimeDetails((prevState) => {
            return {
                ...prevState, 
                currentTimeItem: {
                    ...prevState.currentTimeItem,
                    currentTime: prevState.currentTimeItem.currentTime - 1,
                    currentCurve: prevState.currentTimeItem.currentCurve - prevState.currentTimeItem.curve
                }
            }
        })
    };

    const createTimeout = () => {
        const timer = window.setInterval(decrementTime, 1000);
        setIntervalId(timer);
    }

    const handleStart = () => {
        setStatus((prevState) => {
            return {
                ...prevState, started: true
            }
        });
        createTimeout();
    }

    const handlePause = () => {
        clearInterval(intervalId);
        handleFadeOn();
        setStatus((prevState) => {
            return {
                ...prevState, paused: true
            }
        })
    }

    const handleResume = () => {
        timerRef.current?.classList.add(`zoomIn`);
        setStatus((prevState) => {
            return {
                ...prevState, paused: false
            }
        });
        createTimeout();
    }

    const handleQuit = () => {
        clearInterval(intervalId);
        setIsFinished();
    }

    useEffect(() => {
        const clearCurrentInterval = () => {
            clearInterval(intervalId);
        }
        if(currentTimeDetails.currentTimeItem.currentTime < 4 && currentTimeDetails.currentTimeItem.currentTime > 0) {
            playBeep();
        }
        if(currentTimeDetails.currentTimeItem.currentTime === 0) {
            playBoop();
        }
        if(currentTimeDetails.currentTimeItem.currentTime === -1 && currentTimeDetails.currentTimeItem.name === 'Cooldown') {
            clearCurrentInterval();
            setStatus((prevState) => {
                return {
                    ...prevState, started: false
                }
            });
            setIsFinished();
        } else if(currentTimeDetails.currentTimeItem.currentTime === -1) {
            clearCurrentInterval();
            setCurrentTimeDetails((prevState) => {
                return {
                    ...prevState, 
                    currentArrayItem: prevState.currentArrayItem + 1,
                    currentTimeItem: timingArray[prevState.currentArrayItem + 1]
                }
            })
            createTimeout();
        }
    }, [currentTimeDetails, intervalId])

    const curveStyle = {
        'strokeDashoffset': `${currentTimeDetails.currentTimeItem.currentCurve}`,
        transition: `${currentTimeDetails.currentTimeItem.currentTime === currentTimeDetails.currentTimeItem.time ? "" : "stroke-dashoffset .5s ease, opacity .3s ease .7s"}`,
        opacity: `${currentTimeDetails.currentTimeItem.currentTime === 0 ? "0" : "1"}`
    }

    const timerColor = getTimerColor(currentTimeDetails.currentTimeItem.name);

    
    return (
        <div style={timerColor}>
            <div className={`${styles.timer} ${status.paused && 'zoomOut'}`} ref={timerRef}>
                <svg
                    className={styles.timer__svg}
                    width="280"
                    height="280">
                    <circle
                        className={styles.timer__circleBack}
                        strokeWidth="12"
                        r="132"
                        cx="140"
                        cy="140"/>
                    <circle
                        style={curveStyle}
                        className={styles.timer__circle}
                        strokeWidth="12"
                        r="132"
                        cx="140"
                        cy="140"/>
                    
                </svg>
                <div className={styles.timer__inner}>
                    {!status.started && <button className="button button--large bgGreen" onClick={handleStart}>Start</button>}
                    {status.started && 
                        <>
                            <p className={styles.timer__time}>{currentTimeDetails.currentTimeItem.currentTime}</p>
                            <p className={styles.timer__timeLabel}>{currentTimeDetails.currentTimeItem.name}</p>
                        </>
                    }
                </div>
            </div>
            {status.started && 
                <>
                    <TimerDetails 
                        currentRound={currentTimeDetails.currentTimeItem.round} 
                        rounds={rounds} 
                        currentSet={currentTimeDetails.currentTimeItem.set} 
                        sets={sets} />
                    <PauseTimer handlePause={handlePause} handleResume={handleResume} handleQuit={handleQuit} isPaused={status.paused} timerRef={timerRef} />
                </>
            }
        </div>
    )
}

export default Timer;