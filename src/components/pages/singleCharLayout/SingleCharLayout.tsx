import { FC } from 'react';
import { Helmet } from 'react-helmet';
import singleCharLayoutStyle from './singleCharLayout.module.scss';

interface ICharType {
    id: string,
    name: string,
    description: string,
    thumbnail: string,
    homepage: string,
    wiki: string,
}

interface IPropsType {
    data: ICharType;
}

const SingleCharLayout: FC<IPropsType> = ({data}: IPropsType) => {

    const {name, description, thumbnail} = data;

    return (
        <div className={singleCharLayoutStyle['single-comic']}>
            <Helmet>
                    <meta name="description"
                    content={`${name} character`}/>
                    <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className={singleCharLayoutStyle['single-comic__char-img']}/>
            <div className={singleCharLayoutStyle['single-comic__info']}>
                <h2 className={singleCharLayoutStyle['single-comic__name']}>{name}</h2>
                <p className={singleCharLayoutStyle['single-comic__descr']}>{description}</p>
            </div>
        </div>
    )
}

export default SingleCharLayout;