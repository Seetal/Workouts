import { useState } from 'react';
import styles from './CountdownTimer.module.scss';
import Modal from '../../Generic/Modal/Modal';
import Radio from '../../Form-Elements/Radio/Radio';
import CountdownTimerItem from '../CountdownTimerItem/CountdownTimerItem';
import { Config } from '../../../config/Config';

type Props = {
    isTimerOpen: boolean;
    handleCloseTimer: () => void;
}

const CountdownTimer = ({ isTimerOpen, handleCloseTimer }: Props) => {
  const [selectedTime, setSelectedTime] = useState<string>('1');

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
      {isTimerOpen &&
        <Modal
          handleClose={handleCloseTimer}
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