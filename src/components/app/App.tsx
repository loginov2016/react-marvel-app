import { Component } from 'react';
import p from '../../lib/print';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import styles from './App.module.scss';
import char_styles from '../charList/charList.module.scss';
import decoration from '../../resources/img/vision.png';

export interface IStateAppType {
    selectedCharId: number | null
}

class App extends Component {

    state: IStateAppType = {
        selectedCharId: null,
    };

    onCharSelected = (id: number): void => {
        //p('id: ', id)
        this.setState({
            selectedCharId: id,
        })
    }

    render() {
        //p('Объект CSS стилей App: ', styles);
        return (
            <div className={styles.app}>
                <AppHeader/>
                <main className={styles.main}>
                    <RandomChar/>
                    <div className={char_styles.char__content}>
                        <CharList onCharSelected={this.onCharSelected}/>
                        <CharInfo charId={this.state.selectedCharId}/>
                    </div>
                    <img className={styles['bg-decoration']} src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;