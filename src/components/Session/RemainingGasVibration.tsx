import React, {useEffect, useState} from "react";
import {createVibrationNotifier, VibrationNotifier} from '../../utils/vibration';
import {Slot} from '../../models/slot';

export default function RemainingGasVibration({visible, id, remainingGas}: Record<'visible', boolean> & Pick<Slot, 'id'|'remainingGas'>) {
  let [notifier, setNotifier] = useState<VibrationNotifier>();

  useEffect(() => {
    setNotifier(notifier ?? createVibrationNotifier(id, 100));
    notifier?.reset();
  }, []);
  useEffect(() => {
    if (remainingGas! >= 0 && remainingGas! <= 0.1) {
      notifier?.notify(!visible);
    } else {
      notifier?.reset();
    }
  }, [notifier, remainingGas]);

  return (<></>);
}
