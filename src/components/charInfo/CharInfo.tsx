import p from '../../lib/print';
import { CSSProperties, FC, useState, useEffect, useRef, PropsWithChildren, ReactElement } from 'react';
import { usePrevProps } from '../../customhooks/usePrevProps';
import MarvelService from '../../service/service';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import { classNames as cn } from '../../lib/classNames';
import buttons from '../../style/button.module.scss';
import styles from './charInfo.module.scss';

interface IPropsType {
    charId: number
}

interface IViewPropsType {
    char: ICharType
}

interface comicType {
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
    comics: comicType[] | null
}
interface IStateType {
    char: ICharType | null,
    loading: boolean,
    error: boolean,
}

const CharInfo: FC<IPropsType> = (props: IPropsType): ReactElement => {

    //p('Объект CSS стилей CharInfo: ', styles);
    
    /* state: IStateType = {
        char : null,
        loading: false,
        error: false,
    }; */
    const prevProps             = usePrevProps(props);
    const [char, setChar]       = useState<ICharType>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(false);

    const marvelService = new MarvelService();

    useEffect( () => {
        p('CharInfo updateChar');
        updateChar();
    }, []);

    /* componentDidUpdate(prevProps: IPropsType, prevState: IStateType): void {
        if( this.props.charId !== prevProps.charId ) {
            this.updateChar();
        }
    } */

    useEffect( () => {
        p('CharInfo useEffect 2');
        if( props.charId !== prevProps ) {
            updateChar();
        }
    }, [props.charId] );

    const onCharLoaded = (char: ICharType): void => {
        p('CharInfo onCharLoaded => state => render');
        p('CharInfo onCharLoaded: ', char);
        //setState({char, loading: false}) // char: char
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = (): void => {
        p('CharInfo onCharloading => state => render');
        setLoading(true);
        setError(false);
    }

    const onCharError = (): void => {
        p('CharInfo onCharError => state => render');
        setLoading(false);
        setError(true);
    }

    const updateChar = (): void => {
        p('CharInfo updateChar => state => render');
        const { charId } = props;
        p('charId: ', charId);
        if( !charId ) {
            return;
        }
        onCharLoading(); // Перед запросом будет показываться спиннер.
        //p('getChar => ...', this.marvelServices.getChar(id)); //Warning: Can't call setState on a component that is not yet mounted.
        marvelService.getChar(charId).then( onCharLoaded  ).catch( onCharError );
        // Метод getAllChars() => вернет промис с результатом - массив объектов.
        // Метод getChar() => вернет промис с результатом - массив с одним элементом - объектом типа ICharType.
    }

    
    //p('char: ', char, 'loading: ', loading, 'error: ', error);
    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && char ? <View char={char}/> : null;

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
                            <a href={item.resourceURI}>{item.name}</a>
                        </li>
                    )
                } ) : 'There is no comics with this character' }
            </ul>
        </>
    )
}

export default CharInfo;