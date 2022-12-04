import {ViewFn} from '../../models/view';

export const errorView: ViewFn<any> = (err: any) => ({
  init: () => {
    const root = document.createElement('div');

    root.style.background = 'red';
    root.innerHTML = `<div style="padding: 50px; overflow: auto">${JSON.stringify(err, null, 2)}</div>`;

    return root;
  }
})
