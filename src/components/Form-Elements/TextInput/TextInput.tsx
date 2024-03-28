import styles from './TextInput.module.scss';

type Props = {
    label: string;
    id: string;
    name: string;
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isValidationVisible?: boolean;
    value: string;
    validationText?: string;
}

const TextInput = ({ label, id, name, isValidationVisible = false, validationText = 'Not Valid', value, handler }: Props) => {
    return (
        <>
            <header className={styles.textInput__header}>
                <label className={styles.textInput__label} htmlFor={id}>{label}</label>
                {isValidationVisible && <p className={styles.textInput__validation}>{validationText}</p>}
            </header>
            <input className={styles.textInput} type="text" id={id} name={name} value={value} onChange={handler} />
        </>
    )
}

export default TextInput;