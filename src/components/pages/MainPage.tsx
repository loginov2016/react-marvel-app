import React, { useState, FC, ReactNode } from 'react';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import appStyles from '../app/App.module.scss';
import charListStyles from '../charList/charList.module.scss';
import decoration from '../../resources/img/vision.png';

export interface IStateAppType {
    selectedCharId: number | null
}


const MainPage: FC = (): ReactNode => {
    //p('Объект CSS стилей App: ', styles);

    const [selectedChar, setSelectedChar] = useState<number | null>(null);

    const onCharSelected = (id: number): void => {
        //p('id: ', id)
        setSelectedChar(id);
    }
    
    return (
    <>
        <RandomChar/>
        <div className={charListStyles.char__content}>
            <CharList onCharSelected={onCharSelected}/>
            <CharInfo charId={selectedChar}/>
        </div>
        <img className={appStyles['bg-decoration']} src={decoration} alt="vision"/>
    </>
    )
}

export default MainPage;