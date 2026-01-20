import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import emailjs from '@emailjs/browser';

// Initiera EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY!);

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MSW === 'true') {
    const { worker } = await import('./mocks/browser.ts');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});