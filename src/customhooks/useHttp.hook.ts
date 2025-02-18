/* 
    Custom hook useHttp.
*/
import { useState, useCallback } from "react";

type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type THeaders = {
    [key: string]: string
}

const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false); // loading: false
    const [error, setError]     = useState<string>(null);   // error: null

    // Метод json возвращает промис. 
    // Конструкция await ждёт когда выполниться  промис и вернет результат.
    // А этот результат асинхронная функция обернет в успешно выполненый промис и вернет его.
    // Так что результатом возврата всегда будет объект промиса.
    const request = useCallback(async (url: string, method: TMethod = 'GET', body:string = null, headers:THeaders = {'Content-Type': 'application/json'})  => {

        try {
            setLoading(true);
            const response = await fetch(url, {method, body, headers});
            //p('Fetch response: ', response); // Объект Response {type: 'cors', url: 'https://gateway.marvel.com/v1/public/characters?li…ffset=210&apikey=cd017cad66cbce86dc2a2f1a288ce8aa', redirected: false, status: 200, ok: true, …}
            if( !response.ok ) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            setLoading(false);
            return data; 
        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
        
    }, []);

    const clearError = useCallback( () => setError(null), [] );

    return {loading, error, clearError, request};
}

export default useHttp;