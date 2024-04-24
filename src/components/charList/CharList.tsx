import p from '../../lib/print';
import { RefObject, useState, useEffect, useRef, FC } from 'react';
import useMarvelService from '../../customhooks/useMarvelService.hook';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { CSSProperties, ReactElement, Component } from 'react';
import { classNames as cn } from '../../lib/classNames';
import buttons from '../../style/button.module.scss';
import styles from './charList.module.scss';

import abyss from '../../resources/img/abyss.jpg';

interface IPropsType {
    onCharSelected: (id: number) => void
}

interface ICharListType {
    id: number,
    name: string,
    description: string,
    thumbnail: string,
    homepage: string,
    wiki: string
}

const CharList: FC<IPropsType> = (props: IPropsType): ReactElement => {

    const [charList, setCharList]   = useState<ICharListType[]>([]);
    const [newCharListLoading, setNewCharListLoading] = useState(false);
    const [offset, setOffset]       = useState<number>(400); // 210, 1554
    const [charEnded, setCharEnded] = useState(false);

    //itemRefs = createRef<HTMLLIElement[]>();
    const arrRefs = useRef<HTMLLIElement[]>([]);

    const {loading, error, clearError, getAllChars} = useMarvelService();

    useEffect( () => {
        onRequest(offset, true);
    }, []);

    const onCharListLoaded = (newCharList: ICharListType[] | []): void => {
        let ended = false;
        if( newCharList.length < 9 ) {
            ended = true;
        }
        // Предыдущий стейт: пустой массив [] и offset === 400
        setCharList( prevCharList => [...prevCharList, ...newCharList] );
        setNewCharListLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const focusOnItem = (i: number): void => {
        //arrRefs.current.forEach( item => p(item) );
        arrRefs.current.forEach( item => item.classList.remove(styles.char__item_selected) );
        arrRefs.current[i].classList.add(styles.char__item_selected);
        arrRefs.current[i].focus();
    }

    const onRequest = (offset: number | undefined, initial: boolean): void => {
        initial ? setNewCharListLoading(false) : setNewCharListLoading(true);
        getAllChars(offset).then( onCharListLoaded )
    }

    function renderCharList(arr: ICharListType[]): ReactElement {
        const { onCharSelected } = props;

        const arrCharListLi = arr.map( (item, i) => {
           
            let imgStyle: CSSProperties = {'objectFit': 'cover'};
            if( item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ) {
                imgStyle = {'objectFit': 'unset'};
            }
            
            return (
                <li className={styles.char__item}
                    tabIndex={0}
                    key={item.id} 
                    onClick={ () => {
                            onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }
                    ref={ el => arrRefs.current[i] = el }
                    onKeyDown={ e => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }
                    }
                    >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className={styles.char__name}>{item.name}</div>
                </li>
            ) 
        } );

        return (
            <ul className={styles.char__grid}>
                {arrCharListLi}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner      = loading && !newCharListLoading ? <Spinner/> : null;
    const itemsLi      = renderCharList(charList);
    //const content      = !(loading || error) ? itemsLi : null;

    return (
        <div className={styles.char__list}>
                {errorMessage}
                {spinner}
                {itemsLi}
            <button className={cn(buttons.button, buttons.button__main, buttons.button__long)}
                disabled={newCharListLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset, false)}>
                <div className={buttons.inner}>load more</div>
            </button>
        </div>
    )
     
}

export default CharList;