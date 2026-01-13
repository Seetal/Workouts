import { useState, useContext } from 'react';
import styles from './CountdownTimer.module.scss';
import Modal from '../../Generic/Modal/Modal';
import { ModalContext } from '../../Generic/Modal/ModalContext';
import Radio from '../../Form-Elements/Radio/Radio';
import CountdownTimerItem from '../CountdownTimerItem/CountdownTimerItem';
import { Config } from '../../../config/Config';

const CountdownTimer = () => {
  const {handleFadeOn} = useContext(ModalContext);
  // const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('1');

  const handleOpen = () => {
    handleFadeOn();
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };
  const radioElements = Config.countdownTimerOptions.map((option) => (
    <li key={option.keyId} className={styles.countdownTimer__item}>
      <Radio
        id={option.id}
        label={option.label}
        name="countdownTimer"
        handler={handleRadioChange}
        checked={selectedTime}
      />
    </li>
  ));
  return (
    <>
      <button className={styles.countdownTimer__btn} onClick={handleOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.1 60.6" className={styles.countdownTimer__icon}><path d="M28.7 9.7V6.3h3.1V0H19.3v6.4h3.1v3.4C9.8 11.3 0 22 0 35.1s11.4 25.5 25.5 25.5S51 49.2 51 35.1 41.2 11.3 28.6 9.7Zm-3.2 46.1c-11.4 0-20.7-9.3-20.7-20.7s9.3-20.7 20.7-20.7 20.7 9.3 20.7 20.7-9.3 20.7-20.7 20.7Z"/><path d="M27.5 36.5c-.9.9-2.3.9-3.2 0s-.9-2.3 0-3.2 14.6-11.4 14.6-11.4-10.5 13.8-11.4 14.6Z"/></svg>
      </button>
      {isOpen &&
        <Modal
          handleClose={handleClose}
          title="Select timer duration"
        >
          <div className={styles.countdownTimer__inner}>
              <ul className={styles.countdownTimer__radioList}>
                {radioElements}
              </ul>
              <CountdownTimerItem time={selectedTime} />
          </div>
          
        </Modal>
      }
    </>
  )
};

export default CountdownTimer;