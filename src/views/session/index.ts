import {ViewFn} from '../../models/view';
import {exchangeView} from '../../utils/exchange-view';
import {loadingView} from '../loading';
import {fetch} from '../../utils/fetch';
import {ApiData} from '../../models/api-data';
import {Race} from '../../models/race';
import {errorView} from './error';
import {slotView} from './slot';

export const sessionView: ViewFn<string> = (sessionName) => {
  let root: Element;
  let data: ApiData<Race>;
  let page = 0;
  let err: any;
  let timer: number|undefined;

  const scheduleFetch = (sec: number) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(
      async () => {
        timer = undefined;
        await execFetch();
      },
      sec * 1000);
  }
  const execFetch = async () => {
    err = undefined;

    const baseUrl = 'https://carrera-live.rohmer.rocks';
    try {
      data = await fetch<ApiData<Race>>(`${baseUrl}/api/sessions/${sessionName}`);
      scheduleFetch(1);
    } catch (e) {
      err = e;
      scheduleFetch(5);
    }

    updateView();
  }
  const handleRotate = (ev: any) => {
    const direction = ev.detail.direction;

    page += +(direction === 'CW') * 2 - 1;
    updateView();
  }

  const updateView = () => {
    if (!root) {
      return
    }

    if (err) {
      return exchangeView(root, errorView(err));
    }

    if (data && !data?.data?.slots?.length) {
      return exchangeView(root, errorView('no slots'));
    }

    if (page >= data.data.slots.length) {
      page = 0;
    } else if (page < 0) {
      page = data.data.slots.length - 1;
    }

    exchangeView(root, slotView({...data.data.slots[page], date: data.date}));
  }


  const init = () => {
    root = document.createElement('div');
    root.className = 'session';

    exchangeView(root, loadingView());

    execFetch();

    document.addEventListener('rotarydetent', handleRotate);

    return root;
  }

  return {
    init,
    destruct: () => {
      if (timer) {
        clearTimeout(timer);
      }
      document.removeEventListener('rotarydetent', handleRotate);
    }
  }
}
