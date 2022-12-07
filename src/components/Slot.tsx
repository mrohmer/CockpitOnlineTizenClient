import React from 'react';
import {Slot} from '../models/slot';
import RemainingGas from './RemainingGas';


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

export default function Slot({slot, date: dateStr, className}: Record<'slot', Slot> & Record<'date', string> & Partial<Record<'className', string>>) {
  const date = dateStr ? new Date(dateStr) : undefined;
  return (
    <div className={`slot ${className}`.trim()}>
      <div className="slot__bg" style={{borderColor: slotColor(slot.id) ?? 'black'}}></div>
      {slot.remainingGas &&
        <div className="slot__gas">
          <RemainingGas remainingGas={slot.remainingGas}/>
        </div>}
      <div className="slot__position">
        {slot.position}.
      </div>
      <div className="slot__name">
        {slot.name}
      </div>
      {slot.car &&
        <div className="slot__car">
          {slot.car.name}
        </div>
      }
      {date &&
        <div className="slot__time">
          {digits(date.getHours())}:{digits(date.getMinutes())}:{digits(date.getSeconds())}
        </div>
      }
    </div>
  )
}
