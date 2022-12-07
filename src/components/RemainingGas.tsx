import React, {MutableRefObject, useEffect, useRef, useState} from 'react';

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
export const useBbox = () => {
  const ref = useRef<SVGSVGElement>();
  const [bbox, setBbox] = useState({});

  const set = () =>
    setBbox(ref && ref.current ? ref.current.getBoundingClientRect() : {});

  useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return [bbox, ref] as [DOMRect, MutableRefObject<SVGSVGElement>];
};

export default function RemainingGas({remainingGas}: Record<'remainingGas', number>) {
  const [bbox, ref] = useBbox();
  const [c, setC] = useState<number|undefined>(undefined);
  const [pct, setPct] = useState<number|undefined>(undefined);
  let value = remainingGas;
  if (value < 0 || !value) {
    value = 0;
  } else if (value > 1) {
    value = 1;
  }

  useEffect(() => {
    const {width} = bbox;
    const tmpC = Math.PI*(width);
    const tmpPct = (1-value) * tmpC;

    setC(tmpC);
    setPct(tmpPct);
  }, [bbox]);

  return (
    <svg className="gas" ref={ref}>
      <circle className={`bar ${isPulsing(value) ? 'bar--pulsing' : ''}`.trim()}
              r="50%"
              cx="50%"
              cy="50%"
              fill="transparent"
              stroke={getColor(value)}
              stroke-dasharray={c ?? 0}
              style={{strokeDashoffset: `${pct ?? 0}px`}}
      ></circle>
    </svg>
  )
}
