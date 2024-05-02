import { useContext } from 'react';
import { IntervalsContext } from '../../../context/IntervalsContext';
import { ModalContext } from '../../Generic/Modal/ModalContext';
import styles from './DuplicateInterval.module.scss';
import { IntervalType } from '../../../types/IntervalType';

type Submitted = {
    isSubmitted: boolean;
    addedInterval: IntervalType;
}

type Props = {
    oldItem: IntervalType;
    newItem: IntervalType;
    submitted: React.Dispatch<React.SetStateAction<Submitted>>;
    closeModal: () => void;
}

const DuplicateInterval = ({ oldItem, newItem, submitted, closeModal }: Props) => {
    const { handleFadeOff } = useContext(ModalContext);
    const { handleAddInterval } = useContext(IntervalsContext);

    const handleAdd = () => {
        handleAddInterval(newItem);
        handleFadeOff();
        setTimeout(() => {
            submitted({ isSubmitted: true, addedInterval: newItem});
            closeModal();
        }, 300);
    }

    const handleClose = () => {
        handleFadeOff();
        setTimeout(() => {
            closeModal()
        }, 300);
    }

    return (
        <section className={styles.duplicateInterval}>
            <p>There is already an interval called <span className={styles.duplicateInterval__name}>'{oldItem?.name}'</span> with the same interval settings. Would you still like to create this new interval?</p>
            <div className="button-row">
                <button className="button bgGreen" onClick={handleAdd}>Yes</button>
                <button className="button button--red" onClick={handleClose}>No</button>
            </div>
        </section>
    )
}

export default DuplicateInterval;