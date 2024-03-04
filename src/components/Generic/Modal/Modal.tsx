import { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

const Modal = ({ children }: { children: JSX.Element }) => {
    const modalRef = useRef(null)

    useEffect(() => {
        const fucusableElements =  modalRef.current?.querySelectorAll('a[href], button');
        console.log(fucusableElements);
    }, []);
    
    return (
        <section className={styles.modal__overlay}>
            <div className={styles.modal} role='dialog' ref={modalRef}>
                <button className={styles.modal__close}>
                    <span className="sr-only">Close Modal</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><path d="m24.1 3.3-1.4-1.4-9.7 9.7-9.7-9.7-1.4 1.4 9.7 9.7-9.7 9.7 1.4 1.4 9.7-9.7 9.7 9.7 1.4-1.4-9.7-9.7z" style={{"fill": "#fff"}}/></svg>
                </button>
                {children}
            </div>
        </section>
    )
}

export default Modal;