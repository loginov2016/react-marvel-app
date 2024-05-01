import { createRoot } from 'react-dom/client';
import App from './components/app/App';

/* 
  Если добавить <StrictMode> <StrictMode/>,
  то рендер компонентов будет дважды. 
*/

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

