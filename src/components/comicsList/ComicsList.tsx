import p from '../../lib/print';
import { classNames as cn } from '../../lib/classNames';
import comicsStyle from './comicsList.module.scss';
import buttons from '../../style/button.module.scss';
import styles from '../../style/style.module.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {
    p('comicsStyle: ', comicsStyle);
    return (
        <div className={comicsStyle.comics__list}>
            <ul className={comicsStyle.comics__grid}>
                <li className={comicsStyle.comics__item}>
                    <a href="#">
                        <img src={uw} alt="ultimate war" className={comicsStyle['comics__item-img']}/>
                        <div className={comicsStyle['comics__item-name']}>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className={comicsStyle['comics__item-price']}>9.99$</div>
                    </a>
                </li>
                <li className={comicsStyle.comics__item}>
                    <a href="#">
                        <img src={xMen} alt="x-men" className={comicsStyle['comics__item-img']}/>
                        <div className={comicsStyle['comics__item-name']}>X-Men: Days of Future Past</div>
                        <div className={comicsStyle['comics__item-price']}>NOT AVAILABLE</div>
                    </a>
                </li>
                <li className={comicsStyle.comics__item}>
                    <a href="#">
                        <img src={uw} alt="ultimate war" className={comicsStyle['comics__item-img']}/>
                        <div className={comicsStyle['comics__item-name']}>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className={comicsStyle['comics__item-price']}>9.99$</div>
                    </a>
                </li>
                <li className={comicsStyle.comics__item}>
                    <a href="#">
                        <img src={xMen} alt="x-men" className={comicsStyle['comics__item-img']}/>
                        <div className={comicsStyle['comics__item-name']}>X-Men: Days of Future Past</div>
                        <div className={comicsStyle['comics__item-price']}>NOT AVAILABLE</div>
                    </a>
                </li>
                <li className={comicsStyle.comics__item}>
                    <a href="#">
                        <img src={uw} alt="ultimate war" className={comicsStyle['comics__item-img']}/>
                        <div className={comicsStyle['comics__item-name']}>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className={comicsStyle['comics__item-price']}>9.99$</div>
                    </a>
                </li>
                <li className={comicsStyle.comics__item}>
                    <a href="#">
                        <img src={xMen} alt="x-men" className={comicsStyle['comics__item-img']}/>
                        <div className={comicsStyle['comics__item-name']}>X-Men: Days of Future Past</div>
                        <div className={comicsStyle['comics__item-price']}>NOT AVAILABLE</div>
                    </a>
                </li>
                <li className={comicsStyle.comics__item}>
                    <a href="#">
                        <img src={uw} alt="ultimate war" className={comicsStyle['comics__item-img']}/>
                        <div className={comicsStyle['comics__item-name']}>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className={comicsStyle['comics__item-price']}>9.99$</div>
                    </a>
                </li>
                <li className={comicsStyle.comics__item}>
                    <a href="#">
                        <img src={xMen} alt="x-men" className={comicsStyle['comics__item-img']}/>
                        <div className={comicsStyle['comics__item-name']}>X-Men: Days of Future Past</div>
                        <div className={comicsStyle['comics__item-price']}>NOT AVAILABLE</div>
                    </a>
                </li>
            </ul>
            <button className={cn(buttons.button, buttons.button__main, buttons.button__long)}>
                <div className={buttons.inner}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;