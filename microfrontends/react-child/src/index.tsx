import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('react-child-root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
