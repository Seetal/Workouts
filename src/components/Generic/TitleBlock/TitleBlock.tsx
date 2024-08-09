import styles from './TitleBlock.module.scss';

type Props = {
    children: React.ReactNode;
	title: string;
}


const TitleBlock = ({ children, title }: Props) => {

	return (
		<div className={styles.titleBlock}>
			<h1 className={styles.titleBlock__title}>{title}</h1>
			{children}
		</div>
	)
}

export default TitleBlock;