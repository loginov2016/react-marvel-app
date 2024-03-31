import { p } from '../../lib/print';
import { classNames as cn } from '../../lib/classNames';
import buttons from '../../style/button.module.scss';
import styles from './randomChar.module.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    p('Объект CSS стилей: ', buttons);

    return (
        <div className={styles.randomchar}>
            <div className={styles.randomchar__block}>
                <img src={thor} alt="Random character" className={styles.randomchar__img}/>
                <div className={styles.randomchar__info}>
                    <p className={styles.randomchar__name}>Thor</p>
                    <p className={styles.randomchar__descr}>
                        As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...
                    </p>
                    <div className={styles.randomchar__btns}>
                        <a href="#" className={cn(buttons.button, buttons.button__main)}>
                            <div className={buttons.inner}>homepage</div>
                        </a>
                        <a href="#" className={cn(buttons.button, buttons.button__secondary)}>
                            <div className={buttons.inner}>Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.randomchar__static}>
                <p className={styles.randomchar__title}>
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className={styles.randomchar__title}>
                    Or choose another one
                </p>
                <button className={cn(buttons.button, buttons.button__main)}>
                    <div className={buttons.inner}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className={styles.randomchar__decoration}/>
            </div>
        </div>
    )
}

export default RandomChar;