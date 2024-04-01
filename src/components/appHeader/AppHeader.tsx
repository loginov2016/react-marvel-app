import { p } from '../../lib/print';
import styles from './appHeader.module.scss';

const AppHeader = () => {

    p('Объект CSS стилей AppHeader: ', styles);

    return (
        <header className={styles.app__header}>
            <h1 className={styles.app__title}>
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className={styles.app__menu}>
                <ul>
                    <li><a href="#">Characters</a></li>
                    /
                    <li><a href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;