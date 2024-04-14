 import { CSSProperties } from 'react';
import img from './errorMessage.gif'; // Здесь была ошибка: Не удается найти модуль "./errorMessage.gif" или 
                                      //                    связанные с ним объявления типов.ts(2307)
                                      // Решил проблему: добавлением в файл global.d.ts строки: declare module '*.gif'

 const ErrorMessage = () => {
    //console.log('ErrorMessage: ', process.env.PUBLIC_URL); // ReferenceError: process is not defined
    const style: CSSProperties = { display: 'block', 
                    width: "250px", 
                    height: "250px", 
                    objectFit: 'contain', 
                    margin: "0 auto",
                };
    return (
        <img src={img} style={style} alt="Error!" />
    )
 }

export default ErrorMessage;

 // src={process.env.PUBLIC_URL + '/errorMessage.gif'}