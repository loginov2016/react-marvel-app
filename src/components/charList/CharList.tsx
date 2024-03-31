import { classNames as cn } from '../../lib/classNames';
import buttons from '../../style/button.module.scss';
import styles from './charList.module.scss';
import abyss from '../../resources/img/abyss.jpg';

const CharList = () => {
    return (
        <div className={styles.char__list}>
            <ul className={styles.char__grid}>
                <li className={styles.char__item}>
                    <img src={abyss} alt="abyss"/>
                    <div className={styles.char__name}>Abyss</div>
                </li>
                <li className={cn(styles.char__item, styles.char__item_selected)}> 
                    <img src={abyss} alt="abyss"/>
                    <div className={styles.char__name}>Abyss</div>
                </li>
                <li className={styles.char__item}>
                    <img src={abyss} alt="abyss"/>
                    <div className={styles.char__name}>Abyss</div>
                </li>
                <li className={styles.char__item}>
                    <img src={abyss} alt="abyss"/>
                    <div className={styles.char__name}>Abyss</div>
                </li>
                <li className={styles.char__item}>
                    <img src={abyss} alt="abyss"/>
                    <div className={styles.char__name}>Abyss</div>
                </li>
                <li className={styles.char__item}>
                    <img src={abyss} alt="abyss"/>
                    <div className={styles.char__name}>Abyss</div>
                </li>
                <li className={styles.char__item}>
                    <img src={abyss} alt="abyss"/>
                    <div className={styles.char__name}>Abyss</div>
                </li>
                <li className={styles.char__item}>
                    <img src={abyss} alt="abyss"/>
                    <div className={styles.char__name}>Abyss</div>
                </li>
                <li className={styles.char__item}>
                    <img src={abyss} alt="abyss"/>
                    <div className={styles.char__name}>Abyss</div>
                </li>
            </ul>
            <button className={cn(buttons.button, buttons.button__main, buttons.button__long)}>
                <div className={buttons.inner}>load more</div>
            </button>
        </div>
    )
}

export default CharList;