import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';

createRoot(document.getElementById('react-child-root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
