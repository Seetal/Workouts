import { useContext } from 'react';
import Modal from '../../Generic/Modal/Modal';
import { ModalContext } from '../../Generic/Modal/ModalContext';

type Props = {
    handlePause: () => void;
    handleResume: () => void;
    handleQuit: () => void;
    isPaused: boolean;
    timerRef: React.RefObject<HTMLDivElement>;
}

const PauseTimer = ({handlePause, handleResume, isPaused, timerRef, handleQuit}: Props) => {

    const { handleFadeOff } = useContext(ModalContext);

    const zoomIn = () => {
        timerRef.current?.classList.add(`zoomIn`);
    };

    const handleResumeButton = () => {
        handleFadeOff();
        zoomIn();
        setTimeout(() => {
            handleResume();
        }, 300);
    }

    const handleQuitButton = () => {
        handleFadeOff();
        setTimeout(() => {
            handleQuit();
        }, 300);
    }
    return (
        <section className="button-row">
            <button className="button button--alt" onClick={handlePause}>Pause</button>
            {isPaused &&
                <Modal title="Interval Paused" handleClose={handleResume} withFadeOff={zoomIn}>
                    <div className="button-row">
                        <button className="button bgGreen" onClick={handleResumeButton}>Resume</button>
                        <button className="button bgRed" onClick={handleQuitButton}>Quit</button>
                    </div>
                </Modal>
            }
        </section>
    )
}

export default PauseTimer;