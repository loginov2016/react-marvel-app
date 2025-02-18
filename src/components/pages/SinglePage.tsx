import { useParams } from 'react-router-dom';
import { useState, useEffect, FC } from 'react';

import useMarvelService from '../../customhooks/useMarvelService.hook';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import { Helmet } from 'react-helmet';

//type TComicOrChar<T> = T extends TDataType ? IComicType : ICharType;

type TDataType = 'comic' | 'character';
type TComicOrCharType = IComicType | ICharType;

interface IDataType {
    data: TComicOrCharType;
}

interface IPropsType {
    Component: FC<IDataType>;
    dataType: TDataType;
}

interface ICharType {
    id: string,
    name: string,
    description: string,
    thumbnail: string,
    homepage: string,
    wiki: string,
}

interface IComicType {
    id: string;
    title: string,
    description: string,
    pageCount: string;
    thumbnail: string,
    language: string;
    price: string;
}

const SinglePage: FC<IPropsType> = ({Component, dataType}: IPropsType) => {
        const {id} = useParams();

        const [data, setData] = useState<TComicOrCharType>(null);
        const {loading, error, getComic, getChar, clearError} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const onDataLoaded = (data: TComicOrCharType): void => {
            setData(data);
        }

        const updateData = () => {
            clearError();
            switch (dataType) {
                case 'comic':
                    getComic(id).then(onDataLoaded);
                    break;
                case 'character':
                    getChar(id).then(onDataLoaded);
            }
        }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !data) ? <Component data={data}/> : null;

        return (
            <>  
                <AppBanner/>
                {errorMessage}
                {spinner}
                {content}
            </>
        )
}

export default SinglePage;