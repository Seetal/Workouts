import Nav from "../Nav/Nav";
import styles from './Layout.module.scss';

type Props = {
    children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.container}>
            <Nav />
            {children}
        </div>
    )
}

export default Layout;