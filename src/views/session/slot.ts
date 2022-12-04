import {ViewFn} from '../../models/view';
import {Slot} from '../../models/slot';
import {gasView} from './gas';

const slotColor = (id: Slot['id']): string => ({
  '1': '#a31b21',
  '2': '#e8d43c',
  '3': '#25c57f',
  '4': '#3865ab',
  '5': '#ced3d0',
  '6': '#141414',
} as Record<Slot['id'], string>)[id];
const digits = (nbr: number, d = 2): string => {
  if (nbr < 0 || !nbr) {
    return '00';
  }
  const str = String(nbr.toFixed(0));
  return str.length < 2 ? `0${str}` : str;
}

export const slotView: ViewFn<Slot & Record<'date', string>> = (slot: Slot & Record<'date', string>) => ({
  init: (parent) => {
    const date = slot?.date ? new Date(slot.date) : undefined;
    const root = document.createElement('div');
    root.className = 'slot';

    root.innerHTML = `
  <div class="slot__bg" style="border-color: ${slotColor(slot.id) ?? 'black'}"></div>
  ${slot.remainingGas ? `
  <div class="slot__gas">
    ${gasView(slot.remainingGas).init(parent).outerHTML}
  </div>
  `: '' }
  <div class="slot__position">
    ${slot.position}.
  </div>
  <div class="slot__name">
    ${slot.name}
  </div>
  ${slot.car ? `
    <div class="slot__car">
      ${slot.car.name}
    </div>
  `.trim() : ''}
  ${date ? `
    <div class="slot__time">
      ${digits(date.getHours())}:${digits(date.getMinutes())}:${digits(date.getSeconds())}
    </div>
  `.trim() : ''}
  `.trim();

    return root;
  }
})
