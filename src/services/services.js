import { p } from '../lib/print';
class MarvelServices {
    #_apiBase = 'https://gateway.marvel.com:443/v1/public/';
    #_apiKey  = 'cd017cad66cbce86dc2a2f1a288ce8aa';
    #_apiLimit = 10;
    #_apiOffset = 210;
    


     getResource = async (url) => {
        let result = await fetch(url);
        p('Fetch result: ', result);
        if( !result.ok ) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json();
    }

    getAllChars = () => {
        return this.getResource(`${this.#_apiBase}characters?limit=${this.#_apiLimit}&offset=${this.#_apiOffset}&apikey=${this.#_apiKey}`)
    }
    getChar = (id) => {
        return this.getResource(`${this.#_apiBase}characters/${id}?apikey=${this.#_apiKey}`)
    }
}

export default MarvelServices;

