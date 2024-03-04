import styles from './TextInput.module.scss';

type NewIntervalType = {
    value: string 
    valid: boolean
    validationText: string
    isValidationVisible: boolean
}

type Props = {
    label: string
    id: string
    name: string
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    newIntervalData: NewIntervalType
}

const TextInput = ({ label, id, name, newIntervalData, handler }: Props) => {
    return (
        <>
            <header className={styles.textInput__header}>
                <label className={styles.textInput__label} htmlFor={id}>{label}</label>
                {newIntervalData.isValidationVisible && <p className={styles.textInput__validation}>{newIntervalData.validationText}</p>}
            </header>
            <input className={styles.textInput} type="text" id={id} name={name} value={newIntervalData.value} onChange={handler} />
        </>
    )
}

export default TextInput;