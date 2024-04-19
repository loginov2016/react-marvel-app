/* 
    Custom hooks.
*/
import { useEffect, useRef } from 'react';

// Custom hook for get previous props in the components.
export function usePrevProps<T>(prevProp: T): T {
    const ref = useRef<T>(null);
    
    useEffect( () => {
      ref.current = prevProp;
    } );
    
    return ref.current;
}