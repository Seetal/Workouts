import styles from './NewIntervalSummary.module.scss';
import LabelValue from '../../Generic/LabelValue/LabelValue';

type DataItem = {
    value: string 
    valid: boolean;
    validationText: string;
    isValidationVisible: boolean;
}

type Data = {
    name: DataItem;
    work: DataItem;
    rest: DataItem;
    rounds: DataItem;
    sets: DataItem;
}

type Props = {
    data: Data;
    addHandler: () => void; 
}

const NewIntervalSummary = ({ data, addHandler }: Props) => {
    return (
        <section className={styles.summary}>
            <dl className={styles.summary__list}>
                <LabelValue label='Work' value={data.work.value} color='Green' />
                <LabelValue label='Rest' value={data.rest.value} color='Green' />
                <LabelValue label='Rounds' value={data.rounds.value} color='Green' />
                <LabelValue label='Sets' value={data.sets.value} color='Green' />
            </dl>
            <div className={styles.summary__btnWrap}>
                <button className='button bgGreen' onClick={addHandler}>Add</button>
            </div>
        </section>
    )
}

export default NewIntervalSummary;