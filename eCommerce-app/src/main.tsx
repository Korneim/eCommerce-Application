import { createRoot } from 'react-dom/client';
import './index.scss';
import 'normalize.css';
import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
