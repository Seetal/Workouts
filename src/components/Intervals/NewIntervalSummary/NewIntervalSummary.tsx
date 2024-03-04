import styles from './NewIntervalSummary.module.scss';
import LabelValue from '../../Generic/LabelValue/LabelValue';

const NewIntervalSummary = ({ data, addHandler }) => {
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