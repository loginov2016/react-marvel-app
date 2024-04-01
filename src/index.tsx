import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {p} from './lib/print';
import MarvelServices from './services/services';
import './style/style.module.scss';

const marvelServices = new MarvelServices();

//marvelServices.getAllChars().then( item => p(item.data.results.forEach( (char: { name: string; }) => p(char.name) )) );
marvelServices.getChar(1011052).then( item => p(item.data.results[0]) );

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

