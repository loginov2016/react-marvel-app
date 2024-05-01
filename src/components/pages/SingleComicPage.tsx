import { useState, useEffect, ReactNode, FC, ReactElement} from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../customhooks/useMarvelService.hook';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import p from '../../lib/print';
import singleComicStyle from  './singleComicPage.module.scss';

interface IViewPropsType {
    comic: IComicType
}

interface IComicType {
    id: string,
    title: string,
    description: string,
    pageCount: string,
    thumbnail: string,
    language: string,
    price: string
}

export const SingleComicPage: FC = (): ReactElement => {
    const { comicId } = useParams();
    //p('comicId: ', comicId);

    const {loading, error, clearError, getComic} = useMarvelService();
    const [comic, setComic] = useState<IComicType>(null);

    useEffect( () => {
        updateComic();
    }, [comicId]);

    const updateComic = (): void => {
        clearError();
        getComic(comicId).then(onComicLoaded);
    }

    const onComicLoaded = (comic: IComicType): void => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;
    
    return (
        <>
            { errorMessage }
            { spinner }
            { content }
        </>
    )
}

const View = ({comic}: IViewPropsType): ReactNode => {
    const { title, description, pageCount, thumbnail, language, price } = comic;
    return (
        <div className={singleComicStyle['single-comic']}>
            <img src={thumbnail} alt={title} className={singleComicStyle['single-comic__img']}/>
            <div className={singleComicStyle['single-comic__info']}>
                <h2 className={singleComicStyle['single-comic__name']}>{title}</h2>
                <p className={singleComicStyle['single-comic__descr']}>{description}</p>
                <p className={singleComicStyle['single-comic__descr']}>{pageCount}</p>
                <p className={singleComicStyle['single-comic__descr']}>Language: {language}</p>
                <div className={singleComicStyle['single-comic__price']}>{price}</div>
            </div>
            <Link to="/comics" className={singleComicStyle['single-comic__back']}>Back to all</Link>
        </div>
    )
}