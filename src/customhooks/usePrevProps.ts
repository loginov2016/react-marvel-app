/* 
    Custom hooks.
*/
import { useEffect, useRef } from 'react';

// Custom hook for get previous props in the components.
export function usePrevProps(prevProp: any): number {
    const ref = useRef<number>(null);
    useEffect( () => {
      ref.current = prevProp;
    } );
    return ref.current;
}