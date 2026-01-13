import { useState, useEffect } from 'react';
import useWakeLock from '../../../hooks/useWakeLock';
import styles from './CountdownTimerItem.module.scss';
// @ts-expect-error - ignore missing type definitions
import useSound from 'use-sound';
import boopSfx from '../../../assets/sounds/boop.mp3';

type Props = {
  time: string;
}

const CountdownTimerItem = ({ time }: Props) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number>();
  const { allowWakeLock } = useWakeLock();

  useEffect(() => {
    allowWakeLock();
  }, []);

  useEffect(() => {
    const seconds = parseInt(time) * 60;
    setSecondsRemaining(seconds);
  }, [time]);

  useEffect(() => {
    console.log('Decrementing time', secondsRemaining);
    if (secondsRemaining === 0) {
      if (intervalId) {
        clearInterval(intervalId);
        const seconds = parseInt(time) * 60;
        setSecondsRemaining(seconds);
        setTimerIsRunning(false);
        playBoop();
      }
    }
  }, [secondsRemaining, intervalId]);

  const [playBoop] = useSound(boopSfx);
  
  const generateRenderedTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;
    return `${mins}:${formattedSecs}`;
  };

  const renderedTime = generateRenderedTime(secondsRemaining);

  const decrementTime = () => {
    setSecondsRemaining((prevState) => (prevState) - 1);
  };

  const handleStart = () => {
    const timer = window.setInterval(decrementTime, 1000);
    setIntervalId(timer);
    setTimerIsRunning(true);
  };

  const handleCancel = () => {
    console.log('Cancelling timer');
    if (intervalId) {
      clearInterval(intervalId);
    }
    const seconds = parseInt(time) * 60;
    setSecondsRemaining(seconds);
    setTimerIsRunning(false);
  };

  return (
    <>
      <p className={styles.countdownTimerItem}>{renderedTime}</p>
      {!timerIsRunning && <button className="button" onClick={handleStart}>Start</button>}
      {timerIsRunning && <button className="button button--red" onClick={handleCancel}>Cancel</button>}
    </>
  );
};

export default CountdownTimerItem;