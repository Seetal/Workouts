import styles from './IntervalItem.module.scss'
import LabelValue from '../../Generic/LabelValue/LabelValue';
import { Link } from 'react-router-dom';
import { IntervalType } from '../../../types/IntervalType';
import { lastUsedFormatted } from './IntervalItem.helpers';

const IntervalItem = ({ id, name, lastUsed, work, rest, rounds, sets, isNew }: IntervalType) => {

    const formattedDate = lastUsedFormatted(lastUsed);

    return (
        <Link to={`/intervals/${id}`} className={styles.intervalItem} aria-labelledby={id}>
            <header className={styles.intervalItem__header}>
                <h2 id={id} className={styles.intervalItem__title}>
                    {isNew && <span className={styles.intervalItem__new}>New</span>}
                    {name} 
                </h2>
                <p className={styles.intervalItem__lastUsed}>Last used: {formattedDate}</p>
            </header>
            <dl className={styles.intervalItem__list}>
                <LabelValue label='Work' value={work} color='Green' />
                <LabelValue label='Rest' value={rest} color='Green' />
                <LabelValue label='Rounds' value={rounds} color='Green' />
                <LabelValue label='Sets' value={sets} color='Green' />
            </dl>
        </Link>
    )
}

export default IntervalItem;