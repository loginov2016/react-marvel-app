import { createRoot } from 'react-dom/client';
import App from './components/app/App';

/* 
  Если добавить <StrictMode> <StrictMode/>,
  то рендер компонентов будет дважды. 
*/

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

/* ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
); */

/* 
// Before
import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);
// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
*/

