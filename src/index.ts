import {sessionView} from './views';
import {exchangeView} from './utils/exchange-view';

declare var tizen: any;

window.onload = function () {
  const rootEl = document.querySelector('#root') as HTMLDivElement;
  if (!rootEl) {
    return;
  }

  tizen.power.request("SCREEN", "SCREEN_NORMAL");

  exchangeView(rootEl, sessionView('cma22'));
};
