import React, {useEffect, useState} from 'react';
import {Race} from '../../models/race';
import Slot from './Slot';
import styled from 'styled-components';

const Root = styled.div`
  width: 100vw;
  height: 100vh;
`;
const SlotContainer = styled.div`
  transition: transform 0.2s;
  width: 100%;
  height: 100%;
  overflow: visible;
  display: flex;
  align-items: center;
  ${({position}: Record<'position',number>) => `transform: translateX(${position === 0 ? 0 : `-${position * 50}%`})`}
`;
const PageSwitchArea = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 15vw;
  z-index: 10;
`;
const PageSwitchAreaRight = styled(PageSwitchArea)`
  right: 0;
`;
const PageSwitchAreaLeft = styled(PageSwitchArea)`
  left: 0;
`;

export default function Slots({race, date, onBack}: Record<'race', Race> & Record<'date', string> & Partial<Record<'onBack', () => void>>) {
  const [page, setPage] = useState<number>(0);

  const handlePageChange = (diff: number) => {
    let tmpPage = page + diff;

    tmpPage = Math.max(Math.min(tmpPage ?? 0, race.slots.length - 1), 0)

    if (tmpPage !== page) {
      setPage(tmpPage);
    }
  };
  const handleBack = () => onBack?.();
  const handleRotate = (ev: any) => {
    const direction = ev.detail.direction;

    handlePageChange(+(direction === 'CW') * 2 - 1);
  };
  useEffect(
    () => {
      document.addEventListener('rotarydetent', handleRotate);
      document.addEventListener('tizenhwkey', handleBack);
      return () => {
        document.removeEventListener('rotarydetent', handleRotate);
        document.removeEventListener('tizenhwkey', handleBack);
      }
    }
  )

  return (
    <Root>
      <SlotContainer position={page ?? 0}>
        {race.slots.map((slot, index) =>
          <Slot key={slot.id}
                slot={slot}
                date={date}
                visible={page === index}
                tiltDirection={page === index ? undefined : (page > index ? 'right' : 'left')}
          />
        )}
      </SlotContainer>
      <PageSwitchAreaLeft onClick={() => handlePageChange(-1)} />
      <PageSwitchAreaRight onClick={() => handlePageChange(1)} />
    </Root>
  )
}
