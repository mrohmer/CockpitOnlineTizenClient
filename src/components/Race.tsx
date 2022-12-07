import React, {useEffect, useState} from 'react';
import {Race} from '../models/race';
import Slot from './Slot';

export default function Race({race, date}: Record<'race', Race> & Record<'date', string>) {
  const [page, setPage] = useState<number>(0);

  const handleRotate = (ev: any) => {
    const direction = ev.detail.direction;

    let tmpPage = page + +(direction === 'CW') * 2 - 1;
    if (tmpPage >= race.slots.length) {
      tmpPage = 0;
    } else if (tmpPage < 0) {
      tmpPage = race.slots.length - 1;
    }

    setPage(tmpPage);
  }
  useEffect(
    () => {
      document.addEventListener('rotarydetent', handleRotate);
      return () => document.removeEventListener('rotarydetent', handleRotate)
    }
  )

  return (
    <div>
      {race.slots.map((slot, index) =>
        <Slot key={slot.id}
              slot={slot}
              date={date}
              visible={page === index} />
      )}
    </div>
  )
}
