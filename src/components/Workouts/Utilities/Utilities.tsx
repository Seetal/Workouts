import { useContext, useState } from 'react';
import styles from './Utilities.module.scss';
import { ModalContext } from '../../Generic/Modal/ModalContext';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import StopWatch from '../StopWatch/StopWatch';

const Utilities = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [isStopWatchOpen, setIsStopWatchOpen] = useState<boolean>(false);
  const {handleFadeOn} = useContext(ModalContext);

  const handleOpenUtilities = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOpenTimer = () => {
    setIsTimerOpen(true);
    setIsMenuOpen(!isMenuOpen);
    handleFadeOn();
  };
  const handleOpenStopWatch = () => {
    setIsStopWatchOpen(true);
    setIsMenuOpen(!isMenuOpen);
    handleFadeOn();
  };
  const handleCloseTimer = () => {
    setIsTimerOpen(false);
  };
  const handleCloseStopWatch = () => {
    setIsStopWatchOpen(false);
  };
  return (
    <>
      <div className={`${styles.utilities} ${isMenuOpen ? styles.open : ''}`}>
        <button className={`${styles.utilities__btn} ${styles.utilities__btnMenu}`} onClick={handleOpenUtilities}>
          <p className="sr-only">Utilities Menu</p>
          <span className={styles.utilities__menuLine}></span>
          <span className={styles.utilities__menuLine}></span>
          <span className={styles.utilities__menuLine}></span>
        </button>
        <button className={styles.utilities__btn} onClick={handleOpenTimer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.1 60.6" className={styles.utilities__icon}><path d="M28.7 9.7V6.3h3.1V0H19.3v6.4h3.1v3.4C9.8 11.3 0 22 0 35.1s11.4 25.5 25.5 25.5S51 49.2 51 35.1 41.2 11.3 28.6 9.7Zm-3.2 46.1c-11.4 0-20.7-9.3-20.7-20.7s9.3-20.7 20.7-20.7 20.7 9.3 20.7 20.7-9.3 20.7-20.7 20.7Z"/><path d="M27.5 36.5c-.9.9-2.3.9-3.2 0s-.9-2.3 0-3.2 14.6-11.4 14.6-11.4-10.5 13.8-11.4 14.6Z"/></svg>
        </button>
        <button className={styles.utilities__btn} onClick={handleOpenStopWatch}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.1 60.6" className={styles.utilities__icon}><path d="M27.5 33.7c.9.9.9 2.3 0 3.2s-2.3.9-3.2 0-11.4-14.6-11.4-14.6 13.8 10.5 14.6 11.4Z"/><path d="M48 22.8C42.9 13.5 32.9 8.7 23.1 9.7v11c0 1.3 1 2.3 2.3 2.3 1.3 0 2.3-1 2.3-2.3v-6.2c6.4.7 12.4 4.3 15.8 10.3 5.4 9.3 2.5 21.5-6.4 27.5s-23.3 3.6-29.4-6.6C3.3 38.2 4.1 29.1 9 22.6l-3.9-2.9c-6 8-7 19.2-1.5 28.4 7.5 12.6 24.1 16.4 36.4 8s14.2-21.9 8-33.4Z"/></svg>
        </button>
      </div>
      <CountdownTimer isTimerOpen={isTimerOpen} handleCloseTimer={handleCloseTimer} />
      <StopWatch isStopWatchOpen={isStopWatchOpen} handleCloseStopWatch={handleCloseStopWatch} />
    </>
  );
}

export default Utilities;