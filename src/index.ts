import {bootstrap} from './components/bootstrap';
import "core-js";

window.onload = function () {
  const rootEl = document.querySelector('#root') as HTMLDivElement;
  if (!rootEl) {
    return;
  }

  try {
    bootstrap(rootEl);
  } catch (e) {
    rootEl.style.background = 'red';
    rootEl.innerHTML = String(e);
  }
};
