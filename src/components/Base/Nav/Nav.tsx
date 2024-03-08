import NavTile from '../NavTile/NavTile';
import styles from './Nav.module.scss';
import { Config } from '../../../config/Config';

const navElements = Config.navData.map((navItem) => {
    return (
        <li key={navItem.id} className={styles.nav__item}>
            <NavTile to={navItem.to} textColor={navItem.textColor} label={navItem.label} />
        </li>
    )
}) 

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.nav__list}>
                {navElements}
            </ul>
        </nav>
    )
}

export default Nav;