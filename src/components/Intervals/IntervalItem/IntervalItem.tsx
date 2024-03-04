import styles from './IntervalItem.module.scss'
import LabelValue from '../../Generic/LabelValue/LabelValue';

type Props = {
    name: string
    lastUsed: string
    work: number
    rest: number
    rounds: number
    sets: number
}

const IntervalItem = ({ name, lastUsed, work, rest, rounds, sets }: Props) => {
    return (
        <article className={styles.intervalItem}>
            <header className={styles.intervalItem__header}>
                <h2 className={styles.intervalItem__title}>{name}</h2>
                <p className={styles.intervalItem__lastUsed}>Last used: {lastUsed}</p>
            </header>
            <dl className={styles.intervalItem__list}>
                <LabelValue label='Work' value={work} color='Green' />
                <LabelValue label='Rest' value={rest} color='Green' />
                <LabelValue label='Rounds' value={rounds} color='Green' />
                <LabelValue label='Sets' value={sets} color='Green' />
            </dl>
        </article>
    )
}

export default IntervalItem;