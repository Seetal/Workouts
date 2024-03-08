import styles from './RadioList.module.scss';
import Radio from '../Radio/Radio';
import { useCreateRadioData } from '../../../hooks/useCreateRadioData';

type NewIntervalType = {
    value: string 
    valid: boolean
    validationText: string
    isValidationVisible: boolean
}

type Props = {
    name: string
    legend: string
    option: number
    accumulator: number
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    newIntervalData: NewIntervalType
}


const RadioList = ({ name, legend, option, accumulator, handler, newIntervalData }: Props ) => {
    const radioData = useCreateRadioData({name, option, accumulator});

    const listElements = radioData.map((item) => {
        return (
            <li key={item.keyId} className={styles.radioList__item}>
                <Radio label={item.label} id={item.id} name={name} handler={handler} checked={newIntervalData.value} />
            </li>
        )
    })

    return (
        <fieldset className={styles.radioList}>
            <header className={styles.radioList__header}>
                <legend className={styles.radioList__legend}>{legend}</legend>
                {newIntervalData.isValidationVisible && <p className={styles.radioList__validation}>{newIntervalData.validationText}</p>}
            </header>
            <ul className={styles.radioList__list}>
                {listElements}
            </ul>
        </fieldset>
    )
}
export default RadioList;