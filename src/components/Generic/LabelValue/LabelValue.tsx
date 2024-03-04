import styles from './LabelValue.module.scss'

type Props = {
    label: string
    value: string | number
    color: string
}

const LabelValue = ({ label, value, color }: Props) => {
    return (
        <div className={styles.labelValue}>
            <dt className={`${styles.labelValue__label} clr${color}`}>{label}</dt>
            <dd className={styles.labelValue__value}>{value}</dd>
        </div>
    )
}

export default LabelValue;