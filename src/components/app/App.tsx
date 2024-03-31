import { p } from '../../lib/print';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import styles from './App.module.scss';
import char_styles from '../charList/charList.module.scss';

import decoration from '../../resources/img/vision.png';


const App = () => {

    p('Объект CSS стилей: ', styles);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <RandomChar/>
                <div className={char_styles.char__content}>
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className={styles['bg-decoration']} src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;