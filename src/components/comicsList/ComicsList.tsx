import {useState, useEffect, FC, ReactElement} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../customhooks/useMarvelService.hook';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import p from '../../lib/print';
import { classNames as cn } from '../../lib/classNames';
import comicsStyle from './comicsList.module.scss';
import buttons from '../../style/button.module.scss';
import styles from '../../style/style.module.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

interface IComicListType {
    id: string,
    title: string,
    description: string,
    pageCount: string,
    thumbnail: string,
    language: string,
    price: string
}

const ComicsList: FC = (): ReactElement => {

    const [comicsList, setComicsList] = useState<IComicListType[]>([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState<number>(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset: number, initial: boolean) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList: IComicListType[] | []) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems (arr: IComicListType[]): ReactElement {
        const items = arr.map((item, i) => {
            return (
                <li className={comicsStyle.comics__item} key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className={comicsStyle['comics__item-img']}/>
                        <div className={comicsStyle['comics__item-name']}>{item.title}</div>
                        <div className={comicsStyle['comics__item-price']}>{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className={comicsStyle.comics__grid}>
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    //p('comicsStyle: ', comicsStyle);
    return (
        <div className={comicsStyle.comics__list}>
            {errorMessage}
            {spinner}
            {items}
            <button 
                disabled={newItemLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className={cn(buttons.button, buttons.button__main, buttons.button__long)}
                onClick={() => onRequest(offset, false)}>
                <div className={buttons.inner}>load more</div>
            </button>
           {/*  <button className={cn(buttons.button, buttons.button__main, buttons.button__long)}>
                <div className={buttons.inner}>load more</div>
            </button> */}
        </div>
    )
}

export default ComicsList;

/* 

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

*/