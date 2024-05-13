import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import singleComicLayoutStyle from './singleComicLayout.module.scss';


interface IComicType {
    id: string;
    title: string,
    description: string,
    pageCount: string;
    thumbnail: string,
    language: string;
    price: string;
}

interface IPropsType {
    data: IComicType;
}

const SingleComicLayout: React.FC<IPropsType> = ({data}: IPropsType) => {
    
    const {title, description, pageCount, thumbnail, language, price} = data;

    return (
        <div className={singleComicLayoutStyle['single-comic']}>
            <Helmet>
                    <meta name="description"
                    content={`${title} comics book`}/>
                    <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className={singleComicLayoutStyle['single-comic__img']}/>
            <div className={singleComicLayoutStyle['single-comic__info']}>
                <h2 className={singleComicLayoutStyle['single-comic__name']}>{title}</h2>
                <p className={singleComicLayoutStyle['single-comic__descr']}>{description}</p>
                <p className={singleComicLayoutStyle['single-comic__descr']}>{pageCount}</p>
                <p className={singleComicLayoutStyle['single-comic__descr']}>Language: {language}</p>
                <div className={singleComicLayoutStyle['single-comic__price']}>{price}</div>
            </div>
            <Link to="/comics" className={singleComicLayoutStyle['single-comic__back']}>Back to all</Link>
        </div>
    )
}

export default SingleComicLayout;