import { useState } from 'react';
import styles from './StopWatch.module.scss';
import Modal from '../../Generic/Modal/Modal';

type Props = {
    isStopWatchOpen: boolean;
    handleCloseStopWatch: () => void;
};

const StopWatch = ({isStopWatchOpen, handleCloseStopWatch}: Props) => {
  const [intervalId, setIntervalId] = useState<number>();
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleStart = () => {
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    setIntervalId(timer);
    setIsRunning(true);
  };
  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };
  const handleReset = () => {
    setElapsedSeconds(0);
  };
  const handleCloseModal = () => {
    handleCloseStopWatch();
    if (intervalId) {
      clearInterval(intervalId);
    }
    setElapsedSeconds(0);
    setIsRunning(false);
  }

  const resetIsActive = elapsedSeconds > 0 && !isRunning;

  return (
    <>
      {isStopWatchOpen &&
        <Modal
          handleClose={handleCloseModal}
          title="Stop Watch"
          >
            <>
              <p className={styles.stopWatch__time}>{elapsedSeconds}</p>
              <div className={styles.stopWatch__buttons}>
                {!isRunning && <button className="button" onClick={handleStart}>Start</button>}
                {isRunning && <button className="button button--red" onClick={handleStop}>Stop</button>}
                <button className={`button button--alt ${resetIsActive ? '' : 'button--disabled'}`} onClick={handleReset}>Reset</button>
              </div>
            </>
        </Modal>
      }
    </>
  );
};

export default StopWatch;