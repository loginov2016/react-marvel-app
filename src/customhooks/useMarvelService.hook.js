import p from '../lib/print';
import useHttp from './useHttp.hook';

const  useMarvelService = () => {
    const { loading, error, request, clearError } = useHttp(); // {loading: false, error: null, ...}
    
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey  = 'cd017cad66cbce86dc2a2f1a288ce8aa';
    const _apiLimit = 9;
    const _apiOffset = 400; // 210

    p('RandomChar loading: ', loading);
    const getAllChars = async (offset = _apiOffset) => {
        const resultPromise = await request(`${_apiBase}characters?limit=${_apiLimit}&offset=${offset}&apikey=${_apiKey}`);
        //p('getAllChars => ', resultPromise.data.results.map( this.#_transformChar ));
        return resultPromise.data.results.map( _transformChar ); // Вернёт промис с результатом - массив объектов.
    }

    const getChar = async (id) => {
        // Поскольку ф-я getChar ассинхронная, то она всегда вернет выполненый промис. 
        // Результат который возвращает ф-я, будет обернут в промис.
        // resultRequest вернёт результат выполненного промиса - объект  Response.
        const resultRequest = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
        p('getChar => resultRequest ', resultRequest);//
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

    const getAllComics = async (offset = 0) => {
        // https://gateway.marvel.com:443/v1/public/comics?orderBy=issueNumber&limit=8&offset=0&apikey=cd017cad66cbce86dc2a2f1a288ce8aa
		const resultRequest = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${_apiKey}`);
		return resultRequest.data.results.map(_transformComic);
	};

	const getComic = async (id) => {
        // https://gateway.marvel.com:443/v1/public/comics/18176?apikey=cd017cad66cbce86dc2a2f1a288ce8aa
		const resultRequest = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
		return _transformComic(resultRequest.data.results[0]);
	};


    const _transformComic = (comic) => {
		return {
			id: comic.id,
			title: comic.title,
			description: comic.description || "There is no description",
			pageCount: comic.pageCount? `${comic.pageCount} p.` : "No information about the number of pages",
			thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
			language: comic.textObjects[0]?.language || "en-us",
			price: comic.prices[0].price? `${comic.prices[0].price}$` : "not available",
		};
	};
    // {loading: false, error: null, f(){...}, f(){...}, f(){...}}
    return {loading, error, clearError, getChar, getAllChars, getComic, getAllComics}; 
}

export default useMarvelService;

