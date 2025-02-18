import {useState, useEffect, FC, ReactElement} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../customhooks/useMarvelService.hook';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { classNames as cn } from '../../lib/classNames';
import comicsStyle from './comicsList.module.scss';
import buttons from '../../style/button.module.scss';

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
                <div className={buttons.inner}>{newItemLoading ? 'Loading...' : "Load More"}</div>
            </button>
        </div>
    )
}

export default ComicsList;