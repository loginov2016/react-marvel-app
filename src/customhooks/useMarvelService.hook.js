import p from '../lib/print';
import { useHttp } from './useHttp.hook';

const  useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey  = 'cd017cad66cbce86dc2a2f1a288ce8aa';
    const _apiLimit = 9;
    const _apiOffset = 400; // 210

    const { loading, error, request, clearError } = useHttp();

    const getAllChars = async (offset = _apiOffset) => {
        const resultPromise = await request(`${_apiBase}characters?limit=${_apiLimit}&offset=${offset}&apikey=${_apiKey}`);
        //p('getAllChars => ', resultPromise.data.results.map( this.#_transformChar ));
        return resultPromise.data.results.map( _transformChar ); // Вернёт промис с результатом - массив объектов.
    }

    const getChar = async (id) => {
        // Поскольку ф-я getChar ассинхронная, то она всегда вернет выполненый промис. 
        // Результат который возвращает ф-я, будет обернут в промис.
        const resultRequest = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
        //p('getChar => resultRequest ', resultRequest);//
        //p('#_transform(resultRequest): ', this.#_transformChar(resultRequest));
        //p('services ф-я getChar', resultRequest.data.results[0]);
        return _transformChar(resultRequest.data.results[0]);
    }

    const _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items // Массив объектов.
        }
    }

    return {loading, error, clearError, getChar, getAllChars};
}

export default useMarvelService;

