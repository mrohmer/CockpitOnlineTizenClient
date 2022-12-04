import {ViewFn} from '../../models/view';

const getColor = (value: number): string => {
  if (value > 0.8) {
    return '#16a34a';
  }

  if (value >= 0.3) {
    return '#ca8a04';
  }

  return '#dc2626';
};

const isPulsing = (value: number) => value < 0.2;

export const gasView: ViewFn<number> = (value: number) => ({
  init: (parent) => {
    if (value < 0 || !value) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    }

    const {width} = parent.getBoundingClientRect();

    const c = Math.PI*(width);

    const pct = (1-value) * c;

    const svg = document.createElement('svg');
    svg.className = 'gas';
    svg.innerHTML = `
        <circle class="${`bar ${isPulsing(value) ? 'bar--pulsing' : ''}`.trim()}" 
                r="50%" 
                cx="50%" 
                cy="50%" 
                fill="transparent"
                stroke="${getColor(value)}" 
                stroke-dasharray="${c}" 
                style="stroke-dashoffset: ${pct}px"
                ></circle>
    `
    return svg;
  }
})
