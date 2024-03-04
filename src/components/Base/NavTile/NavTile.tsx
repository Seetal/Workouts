import styles from './NavTile.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
    textColor: string;
    label: string;
    to: string;
};

const NavTile = ({textColor, label, to}: Props) => {
    const navTileColor = { "--nav-tile-color": `var(--clr-${textColor})` } as React.CSSProperties;
    return (
        <NavLink 
            className={({ isActive }) =>
            isActive ? `${styles.navTile} ${styles[textColor]} ${styles.active}` : 
            `${styles.navTile} ${styles[textColor]}`}
            to={to}
            style={navTileColor}
            >
            {label}
        </NavLink>
    )
}

export default NavTile;