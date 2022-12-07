import {bootstrap} from './components/bootstrap';
import "core-js";

declare var tizen: any;

window.onload = function () {
  const rootEl = document.querySelector('#root') as HTMLDivElement;
  if (!rootEl) {
    return;
  }

  tizen.power.request("SCREEN", "SCREEN_NORMAL");

  try {
    bootstrap(rootEl);
  } catch (e) {
    rootEl.style.background = 'red';
    rootEl.innerHTML = String(e);
  }
};
