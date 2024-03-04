import styles from './Heading.module.scss';

type Props = {
    title: string;
}

const Heading = ({ title }: Props) => {
    return (
        <h1 className={styles.heading}>{title}</h1>
    )
}

export default Heading;