import p from '../../lib/print';
import { Link, NavLink } from 'react-router-dom';
import styles from './appHeader.module.scss';

const AppHeader = () => {

    //p('Объект CSS стилей AppHeader: ', styles);

    return (
        <header className={styles.app__header}>
            <h1 className={styles.app__title}>
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className={styles.app__menu}>
                <ul>
                    <li><NavLink exact activeStyle={{'color': '#9f0013'}} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink exact activeStyle={{'color': '#9f0013'}} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;