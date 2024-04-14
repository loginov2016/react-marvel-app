import { CSSProperties, Component, ReactPropTypes } from 'react';
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
interface IStateType {
    char: ICharType,
    loading: boolean,
    newRandomCharLoading: boolean
    error: boolean,
}

interface IPropsType {
    char: ICharType
}

class RandomChar extends Component {
    constructor(props: any) {
        super(props);
        p('RandomChar constructor');
    }

    state: IStateType = {
        char : {
            id: null,
            name: null,
            description: null,
            thumbnail: null,
            homepage: null,
            wiki: null, 
        },
        loading: true,
        newRandomCharLoading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        p('RandomChar componentDidMount');
        this.updateChar();
    }

    onCharLoaded = (char: ICharType): void => {
        p('RandomChar onCharLoaded => state => render');
        this.setState({
            char, 
            loading: false, 
            newRandomCharLoading: false
        }) // char: char
    }

    onCharLoading = () => {
        p('RandomChar onCharloading => state => render');
        this.setState( { 
            loading: true,
            newRandomCharLoading: true,
            error: false 
        });
    }

    onCharError = (): void => {
        p('RandomChar onCharError => state => render');
        this.setState({
           loading: false,
           newRandomCharLoading: false,
           error: true, 
        })
    }

    updateChar = (): void => {
        p('RandomChar updateChar => state => render');
        const id = Math.floor( Math.random() * 400 + 1011000 );
        this.onCharLoading();
        this.marvelService.getChar(id).then( this.onCharLoaded  ).catch( this.onCharError );
        // Метод getAllChars() => вернет промис с результатом - массив объектов.
    }

    render() {
        p('RandomChar render');
        //marvelServices.getAllChars().then( item => p(item.data.results.forEach( (char: { name: string; }) => p(char.name) )) );
        //this.marvelServices.getChar(1011052).then( item => p(item.data.results[0]) );
        //p('Объект CSS стилей RandomChar: ', buttons);
        const {char, loading, error } = this.state;
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
                        onClick={this.updateChar}
                        disabled={this.state.newRandomCharLoading}
                        >
                        <div className={buttons.inner}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className={styles.randomchar__decoration}/>
                </div>
            </div>
        )    
        
    }
}

const View = ( {char}: IPropsType  ) => {
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