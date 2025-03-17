import p from '../../lib/print';
import { CSSProperties, FC, useState, useEffect, useRef, PropsWithChildren, ReactElement } from 'react';
import { usePrevProps } from '../../customhooks/usePrevProps.hook';
import useMarvelService from '../../customhooks/useMarvelService.hook';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import { classNames as cn } from '../../lib/classNames';
import buttons from '../../style/button.module.scss';
import styles from './charInfo.module.scss';
import { Link } from 'react-router-dom';

interface IPropsType {
    charId: number
}

interface IViewPropsType {
    char: ICharType
}

interface IComicType {
    name: string | null,
    resourceURI: string | null
}
interface ICharType {
    id: number | null,
    name: string | null,
    description: string | null,
    thumbnail: string | null,
    homepage: string | null,
    wiki: string | null,
    comics: IComicType[] | null
}
interface IStateType {
    char: ICharType | null,
    loading: boolean,
    error: boolean,
}

const CharInfo: FC<IPropsType> = (props: IPropsType): ReactElement => {

    //p('Объект CSS стилей CharInfo: ', styles);
    
    const prevPropsCharId       = usePrevProps<number>(props.charId);
    const [char, setChar]       = useState<ICharType>(null);
    const {loading, error, clearError, getChar} = useMarvelService();

    useEffect( () => {
        p('CharInfo updateChar');
        updateChar();
    }, []);

    useEffect( () => {
        p('CharInfo useEffect 2');
        if( props.charId !== prevPropsCharId ) {
            updateChar();
        }
    }, [props.charId] );

    const onCharLoaded = (char: ICharType): void => {
        //p('CharInfo onCharLoaded => state => render');
        //p('CharInfo onCharLoaded: ', char);
        setChar(char);
        //setLoading(false);
    }

    const updateChar = (): void => {
        //p('CharInfo updateChar => state => render');
        const { charId } = props;
        //p('charId: ', charId);
        if( !charId ) {
            return;
        }
        clearError();
        //onCharLoading(); // Перед запросом будет показываться спиннер.
        //p('getChar => ...', this.marvelServices.getChar(id)); //Warning: Can't call setState on a component that is not yet mounted.
        getChar(charId).then( onCharLoaded  );
        // Метод getAllChars() => вернет промис с результатом - массив объектов.
        // Метод getChar() => вернет промис с результатом - массив с одним элементом - объектом типа ICharType.
    }
    
    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className={styles.char__info}>
            { skeleton }
            { errorMessage }
            { spinner }
            { content }
        </div>
    )

}

const View = ({char}: IViewPropsType) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let imgStyle: CSSProperties = {'objectFit': 'cover'};
    if( thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ) {
        imgStyle = {'objectFit': 'contain'};
    }
    return (
        <>
            <div className={styles.char__basics}>
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className={styles['char__info-name']}>{name}</div>
                    <div className={styles.char__btns}>
                        <a href={homepage} className={cn(buttons.button, buttons.button__main)}>
                            <div className={buttons.inner}>Homepage</div>
                        </a>
                        <a href={wiki} className={cn(buttons.button, buttons.button__secondary)}>
                            <div className={buttons.inner}>Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.char__descr}>
                {description ? description : 'There is no description for this character'}
            </div>
            <div className={styles.char__comics}>Comics:</div>
            <ul className={styles['char__comics-list']}>
                { comics.length > 0 ? comics.map( (item, index) => {
                    if( index > 9 ) return; // Если индекс элемента массива становиться больше 9, то происходит выход из функции. 
                    return (
                        <li key={index} className={styles['char__comics-item']}>
                            <Link to={item.resourceURI}>{item.name}</Link>
                        </li>
                    )
                } ) : 'There is no comics with this character' }
            </ul>
        </>
    )
}

export default CharInfo;