import React from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';

export const bootstrap = (rootEl: Element) => {
  createRoot(rootEl).render(
    <App />,
  );
}
