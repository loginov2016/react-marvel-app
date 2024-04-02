import { Component } from 'react';
import MarvelServices from '../../services/services';
import { p } from '../../lib/print';
import { classNames as cn } from '../../lib/classNames';
import buttons from '../../style/button.module.scss';
import styles from './randomChar.module.scss';
import mjolnir from '../../resources/img/mjolnir.png';

interface stateType {
    char: charType
}

interface charType {
    name: string | null,
    description: string | null,
    thumbnail: string | null,
    homepage: string | null,
    wiki: string | null,
}

class RandomChar extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.updateChar();
    }

    /* 
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null, 
    */
    state: stateType = {
        char : {
            name: null,
            description: null,
            thumbnail: null,
            homepage: null,
            wiki: null, 
        }
    };
    marvelServices = new MarvelServices();

    onCharLoaded = (char: charType) => {
        this.setState({char}) // char: char
    }

    updateChar = () => {
        const id = Math.floor( Math.random() * 400 + 1011000 );
        //p('getChar => ...', this.marvelServices.getChar(id)); //Warning: Can't call setState on a component that is not yet mounted.
        this.marvelServices.getChar(id).then( this.onCharLoaded  );
        // Метод getAllChars() => вернет промис с результатом - массив объектов.
        //this.marvelServices.getAllChars().then( item => p(item.forEach( (obj: { name: {}; }) => p(obj.name) )) );
    }

    render() {
        //marvelServices.getAllChars().then( item => p(item.data.results.forEach( (char: { name: string; }) => p(char.name) )) );
        //this.marvelServices.getChar(1011052).then( item => p(item.data.results[0]) );
        //p('Объект CSS стилей RandomChar: ', buttons);
        //p('Картинка thor: ', thor);
        const {char: {name, description, thumbnail, homepage, wiki} } = this.state;
        return (
            <div className={styles.randomchar}>
                <div className={styles.randomchar__block}>
                    <img src={thumbnail} alt="Random character" className={styles.randomchar__img}/>
                    <div className={styles.randomchar__info}>
                        <p className={styles.randomchar__name}>{name}</p>
                        <p className={styles.randomchar__descr}>{description}</p>
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
                <div className={styles.randomchar__static}>
                    <p className={styles.randomchar__title}>
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className={styles.randomchar__title}>
                        Or choose another one
                    </p>
                    <button className={cn(buttons.button, buttons.button__main)}>
                        <div className={buttons.inner}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className={styles.randomchar__decoration}/>
                </div>
            </div>
        )
    }
}

export default RandomChar;