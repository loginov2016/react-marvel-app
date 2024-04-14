import p from '../../lib/print';
import { RefObject, createRef } from 'react';
import MarvelService from '../../service/service';
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

interface IStateType {
    charList: ICharListType[] | [],
    loading: boolean,
    error: boolean,
    newCharListLoading: boolean,
    offset: number,
    charEnded: boolean
}

class CharList extends Component<IPropsType, IStateType> {

    state: IStateType = {
        charList: [],
        loading: true,
        error: false,
        newCharListLoading: false,
        offset: 400, // 210, 1554
        charEnded: false
    };

    //itemRefs = createRef<HTMLLIElement[]>();
    arrRefs: HTMLLIElement[] = [];

    setLiRef = (el: HTMLLIElement): void => {
        this.arrRefs.push(el);
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest(undefined);
    }

    onCharListLoading(): void {
        this.setState({
             newCharListLoading: true
         });
    }

    onCharListLoaded = (newCharList: ICharListType[]) => {
        let ended = false;
        if( newCharList.length < 9 ) {
            ended = true;
        }
        // Предыдущий стейт: пустой массив [] и offset === 210
        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList], 
            loading: false,
            error: false,
            newCharListLoading: false,
            offset: offset + 9,
            charEnded: ended
        })); // Сокращенная запись: { char: char }.
    }
 
    onCharError = (): void => {
         this.setState({
            loading: false,
            error: true, 
         })
    }

    focusOnItem = (id: number): void => {
        //this.arrRef.forEach( item => p(item) );
        this.arrRefs.forEach( item => item.classList.remove(styles.char__item_selected) );
        this.arrRefs[id].classList.add(styles.char__item_selected);
        this.arrRefs[id].focus();
    }

    onRequest = (offset: number | undefined): void => {
        this.onCharListLoading();
        this.marvelService
            .getAllChars(offset)
            .then( this.onCharListLoaded )
            .catch( this.onCharError );
    }

    renderCharList(arr: ICharListType[]): ReactElement {
        const { onCharSelected } = this.props;
        const arrCharListLi = arr.map( (item, i) => {
           
            let imgStyle: CSSProperties = {'objectFit': 'cover'};
            if( item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ) {
                imgStyle = {'objectFit': 'unset'};
            } 
            
            return (
                <li className={styles.char__item}
                    tabIndex={0}
                    key={item.id} 
                    onClick={() => {
                            onCharSelected(item.id);
                            this.focusOnItem(i);
                        }
                    }
                    ref={this.setLiRef}
                    onKeyDown={ e => {
                            if (e.key === ' ' || e.key === "Enter") {
                                this.props.onCharSelected(item.id);
                                this.focusOnItem(i);
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

    render() {
        const {charList, loading, error, newCharListLoading, offset, charEnded} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner      = loading ? <Spinner/> : null;
        const itemsLi = this.renderCharList(charList);
        const content = !loading && !error ? itemsLi : null;

        return (
            <div className={styles.char__list}>
                    {errorMessage}
                    {spinner}
                    {content}
                <button className={cn(buttons.button, buttons.button__main, buttons.button__long)}
                    disabled={newCharListLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className={buttons.inner}>load more</div>
                </button>
            </div>
        )
    } 
}

export default CharList;