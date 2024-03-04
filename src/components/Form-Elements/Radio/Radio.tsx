import styles from './Radio.module.scss'

type Props = {
    label: string
    id: string
    name: string
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: string
}

const Radio = ({ label, id, name, handler, checked }: Props) => {
    return (
        <>
            <input 
                id={id} 
                type="radio" 
                name={name}
                className={`${styles.radio__radio} sr-only`}
                value={label} 
                checked={checked === label}
                onChange={handler} />
            <label 
                htmlFor={id} 
                className={styles.radio__label} 
                >{label}</label>
        </>
    )
}

export default Radio;