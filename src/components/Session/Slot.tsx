import React from 'react';
import {Slot} from '../../models/slot';
import RemainingGas from './RemainingGas';
import styled from 'styled-components';


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

type RootProps = Record<'visible', boolean> & Record<'tiltDirection', 'left'|'right'|undefined>;
const Root = styled.div`
  flex: 1;
  min-width: 100vw;
  max-width: 100vw;
  height: 100vh;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-right: -50%;
  overflow: hidden;
  border-radius: 100%;
  transition: opacity 0.3s, transform 0.2s;
  transform-origin: center;
  
  opacity: ${({visible}: RootProps) => visible ? 1 : 0};
  z-index: ${({visible}: RootProps) => visible ? 1 : 0};
  pointer-events: ${({visible}: RootProps) => visible ? 'all' : 'none'};
  ${({visible: v, tiltDirection: td}: RootProps) => `transform: translateY(${v ? 0 : `10%`}) ${td ? `rotate(${td === 'right' ? '-' : ''}20deg)` : ''};`.trim()}
`;
const Indicator = styled.div`
  position: absolute;
  border-right-width: 35px;
  border-right-style: solid;
  border-right-color: ${({color}: Record<'color', string>) => color ?? '#000'};
  width: 100px;
  height: 384px;
  left: -20px;
  top: -80px;
  transform: rotate(35deg);
  transform-origin: center;
`;
const Gas = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SlotInfo = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 35px 0 15px;
`;
const SlotCenteredInfo = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;
const Position = styled.div`
  font-size: 50px;
  color: #fff;
`;
const Name = styled.div`
  font-size: 30px;
  color: #fff;
`;
const CarName = styled.div`
  font-size: 25px;
  color: #666;
`;
const Time = styled.div`
  font-size: 15px;
  color: #666;
`;

export default function Slot({slot, date: dateStr, visible, tiltDirection}: Record<'slot', Slot> & Record<'date', string> & Record<'tiltDirection', 'left'|'right'|undefined> & Partial<Record<'visible', boolean>>) {
  const date = dateStr ? new Date(dateStr) : undefined;
  return (
    <Root visible={visible ?? false} tiltDirection={tiltDirection}>
      <Indicator color={slotColor(slot.id)}></Indicator>

      {slot.remainingGas &&
        <Gas>
          <RemainingGas remainingGas={slot.remainingGas}/>
        </Gas>}
      <SlotInfo>
        <SlotCenteredInfo>
          <Position>
            {slot.position}.
          </Position>
          <Name>
            {slot.name}
          </Name>
          {slot.car &&
            <CarName>
              {slot.car.name}
            </CarName>
          }
        </SlotCenteredInfo>
        {date &&
          <Time>
            {digits(date.getHours())}:{digits(date.getMinutes())}:{digits(date.getSeconds())}
          </Time>
        }
      </SlotInfo>
    </Root>
  )
}
