/* 

*/
import { useState, useCallback } from "react";

type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type THeaders = {
    [key: string]: string
}

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError]     = useState<string>(null);

    const request = useCallback(async (url: string, method: TMethod = 'GET', body:string = null, headers:THeaders = {'Content-Type': 'application/json'}) => {
        setLoading(true);
        try {
            const response = await fetch(url, {method, body, headers});
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