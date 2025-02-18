import p from '../../lib/print';
import { Link, NavLink } from 'react-router-dom';
import styles from './appHeader.module.scss';

const AppHeader = () => {

    return (
        <header className={styles.app__header}>
            <h1 className={styles.app__title}>
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className={styles.app__menu}>
                <ul>
                    <li><NavLink end style={ ({ isActive }) => ({'color': isActive ? '#9f0013': 'inherit'})} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink end style={ ({ isActive }) => ({'color': isActive ? '#9f0013': 'inherit'})} to="/comics">Comics</NavLink></li>
                    {/* /
                    <li><NavLink end style={ ({ isActive }) => ({'color': isActive ? '#9f0013': 'inherit'})} to="/comic">Comic</NavLink></li> */}
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;