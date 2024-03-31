import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.module.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

