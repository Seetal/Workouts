import { useEffect, useContext} from 'react';
import styles from './Modal.module.scss';
import { ModalContext } from './ModalContext';

type Props = {
    children: JSX.Element;
    handleClose: () => void;
    title: string;
    withFadeOff?: () => void;
}

const Modal = ({ children, handleClose, title, withFadeOff }: Props) => {
    const {handleFadeOff, fadeOff} = useContext(ModalContext)
    
    //@ts-ignore
    const handleEscape = (e) => {
        if (e.keyCode == 27) {
            handleFadeOff();
        }
    }
    
    const handleFadeAndClose = () => {
        handleFadeOff();
        if(withFadeOff) {
            withFadeOff();
        }
        setTimeout(() => {
            handleClose();
        }, 300);
    }

    useEffect(() => {

        document.addEventListener('keydown', handleEscape);

        return (
            () => {
                document.removeEventListener('keydown', handleEscape);
            }
        )
    }, []); 
    
    const fadeStyles = fadeOff ? styles.fadeModalOff : styles.fadeModalOn;
    
    return (
        <section className={`${styles.modal__overlay} ${fadeStyles}`} onClick={handleFadeAndClose}>
            <div className={styles.modal} role='dialog' onClick={(e) => e.stopPropagation()}>
                <button className={styles.modal__close} onClick={handleFadeAndClose}>
                    <span className="sr-only">Close Modal</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><path d="m24.1 3.3-1.4-1.4-9.7 9.7-9.7-9.7-1.4 1.4 9.7 9.7-9.7 9.7 1.4 1.4 9.7-9.7 9.7 9.7 1.4-1.4-9.7-9.7z" style={{"fill": "#fff"}}/></svg>
                </button>
                <h2 className={styles.modal__title}>{title}</h2>
                {children}
            </div>
        </section>
    )
}

export default Modal;