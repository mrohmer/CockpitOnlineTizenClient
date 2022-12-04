import {View} from '../models/view';

export const exchangeView = (rootEl: Element, view: View) => {
  if (!rootEl) {
    return;
  }
  (rootEl as any).destruct?.();
  Array.from(rootEl.children ?? [])
    .forEach(child => rootEl.removeChild(child));

  rootEl.appendChild(view.init(rootEl));
  (rootEl as any).destruct = view.destruct;
}
