import React, { useState, FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from '../charSearchForm/CharSearchForm';

import appStyles from '../app/App.module.scss';
import charListStyles from '../charList/charList.module.scss';
import decoration from '../../resources/img/vision.png';

export interface IStateAppType {
    selectedCharId: number | null
}


export const MainPage: FC = (): ReactNode => {
    //p('Объект CSS стилей App: ', styles);

    const [selectedChar, setSelectedChar] = useState<number | null>(null);

    const onCharSelected = (id: number): void => {
        //p('id: ', id)
        setSelectedChar(id);
    }
    
    return (
    <>  
        <Helmet>
            <meta name="description"
            content="Marvel Comics portal"
            />
            <title>Marvel Comics Portal</title>
        </Helmet>
        <RandomChar/>
        <div className={charListStyles.char__content}>
            <CharList onCharSelected={onCharSelected}/>
            <div>
                <CharInfo charId={selectedChar}/>
                <CharSearchForm/>
            </div>
        </div>
        <img className={appStyles['bg-decoration']} src={decoration} alt="vision"/>
    </>
    )
}