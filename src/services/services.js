import { p } from '../lib/print';
class MarvelServices {
    #_apiBase = 'https://gateway.marvel.com:443/v1/public/';
    #_apiKey  = 'cd017cad66cbce86dc2a2f1a288ce8aa';
    #_apiLimit = 10;
    #_apiOffset = 210;
    


     getResource = async (url) => {
        let result = await fetch(url); 
        p('Fetch result: ', result); // Объект Response {type: 'cors', url: 'https://gateway.marvel.com/v1/public/characters?li…ffset=210&apikey=cd017cad66cbce86dc2a2f1a288ce8aa', redirected: false, status: 200, ok: true, …}
        if( !result.ok ) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json(); // Метод json возвращает промис. 
                                    // Конструкция await ждёт когда выполниться  промис и вернет результат.
                                    // А этот результат асинхронная функция обернет в успешно выполненый промис и вернет его.
                                    // Так что результатом возврата всегда будет объект промиса.
    }

    getAllChars = async () => {
        const resultPromise = await this.getResource(`${this.#_apiBase}characters?limit=${this.#_apiLimit}&offset=${this.#_apiOffset}&apikey=${this.#_apiKey}`);
        //p('getAllChars => ', resultPromise.data.results.map( this.#_transformChar ));
        return resultPromise.data.results.map( this.#_transformChar ); // Вернёт промис с результатом - массив объектов.
    }

    getChar = async (id) => {
        // Поскольку ф-я getChar ассинхронная, то она всегда вернет выполненый промис. 
        // Результат который возвращает ф-я, будет обернут в промис.
        const resultRequest = await this.getResource(`${this.#_apiBase}characters/${id}?apikey=${this.#_apiKey}`);
        //p('getChar => resultRequest ', resultRequest);//
        //p('#_transform(resultRequest): ', this.#_transformChar(resultRequest));
        p(resultRequest.data.results[0]);
        return this.#_transformChar(resultRequest.data.results[0]);
    }

    #_transformChar = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelServices;

