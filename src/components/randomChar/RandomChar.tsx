import { CSSProperties, useState, ReactPropTypes, useEffect, FC, ReactElement, ReactNode } from 'react';
import MarvelService from '../../service/service';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import p from '../../lib/print';
import { classNames as cn } from '../../lib/classNames';
import buttons from '../../style/button.module.scss';
import styles from './randomChar.module.scss';
import mjolnir from '../../resources/img/mjolnir.png';

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

    const [char, setChar] = useState<ICharType>(null);
    const [loading, setLoading] = useState(true);
    const [newRandomCharLoading, setNewRandomCharLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect( () => {
        p('RandomChar useEffect => updateChar');
        updateChar();
    }, [] );

    const onCharLoaded = (char: ICharType): void => {
        p('RandomChar onCharLoaded => state => render');
        /* this.setState({
            char, 
            loading: false, 
            newRandomCharLoading: false
        }) // char: char */
        setChar(char);
        setLoading(false);
        setNewRandomCharLoading(false);

    }

    const onCharLoading = () => {
        p('RandomChar onCharloading => state => render');
        /* this.setState( { 
            loading: true,
            newRandomCharLoading: true,
            error: false 
        }); */
        setLoading(true);
        setNewRandomCharLoading(true);
        setError(false);

    }

    const onCharError = (): void => {
        p('RandomChar onCharError => state => render');
       /*  this.setState({
           loading: false,
           newRandomCharLoading: false,
           error: true, 
        }) */
        setLoading(false);
        setNewRandomCharLoading(false);
        setError(true);
    }

    const updateChar = (): void => {
        p('RandomChar updateChar => state => render');
        const id = Math.floor( Math.random() * 400 + 1011000 );
        onCharLoading();
        marvelService.getChar(id).then( onCharLoaded  ).catch( onCharError );
        // Метод getAllChars() => вернет промис с результатом - массив объектов.
    }

    
        p('RandomChar render');
        //marvelServices.getAllChars().then( item => p(item.data.results.forEach( (char: { name: string; }) => p(char.name) )) );
        //this.marvelServices.getChar(1011052).then( item => p(item.data.results[0]) );
        //p('Объект CSS стилей RandomChar: ', buttons);
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && !error ? <View char={char}/> : null;

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
                        onClick={updateChar}
                        disabled={newRandomCharLoading}
                        >
                        <div className={buttons.inner}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className={styles.randomchar__decoration}/>
                </div>
            </div>
        )    
        
    
}

const View: FC<IPropsType> = ( {char}: IPropsType  ): ReactNode => {
    const {name, description, thumbnail, homepage, wiki} = char;

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
                    <a href={homepage} className={cn(buttons.button, buttons.button__main)}>
                        <div className={buttons.inner}>homepage</div>
                    </a>
                    <a href={wiki} className={cn(buttons.button, buttons.button__secondary)}>
                        <div className={buttons.inner}>Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;