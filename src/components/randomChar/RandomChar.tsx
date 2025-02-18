import { CSSProperties, useState, ReactPropTypes, useEffect, FC, ReactElement, ReactNode } from 'react';
import useMarvelService from '../../customhooks/useMarvelService.hook';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import p from '../../lib/print';
import { classNames as cn } from '../../lib/classNames';
import buttons from '../../style/button.module.scss';
import styles from './randomChar.module.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Link } from 'react-router-dom';

interface ICharType {
    id: number | null,
    name: string | null,
    description: string | null,
    thumbnail: string | null,
    homepage: string | null,
    wiki: string | null,
}

interface IPropsType {
    char: ICharType
}

const RandomChar: FC = (): ReactNode => {    
    p('RandomChar FC');
    const {loading, error, clearError, getChar} = useMarvelService(); // {loading: false, error: null, f(){...}, f(){...}}
    const [char, setChar]                       = useState<ICharType>(null);
    const [newRandomCharLoading, setNewRandomCharLoading] = useState(false);
    const [buttonName, setButtonName] = useState('Try It');
    
    useEffect( () => {
        p('RandomChar useEffect => updateChar');
        updateChar();
    }, [] );

    const onCharLoaded = (char: ICharType): void => {
        p('RandomChar onCharLoaded => state => render');
        setChar(char);
        setNewRandomCharLoading(false);
        setButtonName('Try It');
    }

    const updateChar = (): void => {
        p('RandomChar updateChar => state => render');
        clearError();
        const id = Math.floor( Math.random() * 400 + 1011000 );
        //p(getChar(id).then( item => p(item) ) );
        getChar(id).then( onCharLoaded ).catch( e => {
            setNewRandomCharLoading(false);
            setButtonName('Loading Error!');
        }) 
        // Set loading = true; Когда в getChar происходит ошибка запроса, то onCharLoaded не выполняется.
        // Следовательно newRandomCharLoading === true
        // Метод getAllChars() => вернет промис с результатом - массив объектов.
    }

    p('RandomChar render');
    //marvelServices.getAllChars().then( item => p(item.data.results.forEach( (char: { name: string; }) => p(char.name) )) );
    //this.marvelServices.getChar(1011052).then( item => p(item.data.results[0]) );
    //p('Объект CSS стилей RandomChar: ', buttons);
    const errorMessage = error ? <ErrorMessage/> : null;
    //p('Random Char loading: ', loading);
    p('Random Char newRandomCharLoading: ', newRandomCharLoading);
    //const charError = error ? setNewRandomCharLoading(false) : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null; // <View char={char}/><h1>Loading</h1>!loading && !error 

    return (
        <div className={styles.randomchar}>
            { errorMessage }
            { spinner }
            { content }
            <div className={styles.randomchar__static}>
                <p className={styles.randomchar__title}>
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className={styles.randomchar__title}>
                    Or choose another one
                </p>
                <button 
                    className={cn(buttons.button, buttons.button__main)} 
                    onClick={ () => {
                                setNewRandomCharLoading(true);
                                setButtonName('Loading...');
                                updateChar();
                            }
                    }
                    disabled={newRandomCharLoading}
                    >
                    <div className={buttons.inner}>{buttonName}</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className={styles.randomchar__decoration}/>
            </div>
        </div>
    )    

}

const View: FC<IPropsType> = ( {char}: IPropsType  ): ReactElement => {
    p('char: ', char);
    const {name, description, thumbnail, homepage, wiki, id} = char;
    console.log('homepage: ', homepage);

    let imgStyle: CSSProperties = {'objectFit': 'cover'};
    if( thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ) {
        imgStyle = {'objectFit': 'contain'};
    }

    return (
        <div className={styles.randomchar__block}>
            <img style={imgStyle} src={thumbnail} alt="Random character" className={styles.randomchar__img}/>
            <div className={styles.randomchar__info}>
                <p className={styles.randomchar__name}>{name}</p>
                <p className={styles.randomchar__descr}>{description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character'}</p>
                <div className={styles.randomchar__btns}>
                    <Link to={`/characters/${id}`} className={cn(buttons.button, buttons.button__main)}>
                        <div className={buttons.inner}>homepage</div>
                    </Link>
                    <Link to={wiki} className={cn(buttons.button, buttons.button__secondary)}>
                        <div className={buttons.inner}>Wiki</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;