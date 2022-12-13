import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import styled, {css, keyframes} from 'styled-components';

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

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
`

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
  transform: rotate(-90deg);
  transform-origin: center;
`;
type BarProps = Partial<Record<'pct' | 'c', number> & Record<'color', string> & Record<'pulsing', boolean>>;
const Bar = styled.circle`
  transition: stroke-dashoffset 1s linear;
  stroke-width: 1em;
  fill: transparent;
  stroke: ${({color}: BarProps) => color ?? '#000'};
  stroke-dashoffset: ${({pct}: BarProps) => pct ?? 0}px;
  stroke-dasharray: ${({c}: BarProps) => c ?? 0};
  ${({pulsing}: BarProps) => pulsing ? css`animation: ${pulseAnimation} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;` : ''}
`;

export default function RemainingGas({remainingGas}: Record<'remainingGas', number>) {
  const [bbox, ref] = useBbox();
  const [c, setC] = useState<number | undefined>(undefined);
  const [pct, setPct] = useState<number | undefined>(undefined);
  const [value, setValue] = useState<number>(remainingGas);

  useEffect(() => {
    if (remainingGas < 0 || !remainingGas) {
      setValue(0)
    } else if (remainingGas > 1) {
      setValue(1)
    } else {
      setValue(remainingGas)
    }
  }, [remainingGas]);

  useEffect(() => {
    const {width} = bbox;
    const tmpC = Math.PI * (width);
    const tmpPct = (1 - value) * tmpC;

    setC(tmpC);
    setPct(tmpPct);
  }, [bbox, value]);

  return (
    <Svg className="gas" ref={ref}>
      <Bar r="50%"
           cx="50%"
           cy="50%"
           c={c}
           pct={pct}
           color={getColor(value)}
           pulsing={isPulsing(value)}
      ></Bar>
    </Svg>
  )
}
