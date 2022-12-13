export const isVibrationSupported = () => 'vibrate' in navigator;
export type VibrationNotifier = Record<'notify', (skipVibration?: boolean) => void> & Record<'reset', () => void>;
export const createVibrationNotifier = (id: string, pattern: number|number[]): VibrationNotifier => {
  let notified = false;

  return {
    notify: (skipVibration?: boolean) => {
      if (notified) {
        return;
      }
      notified = true;
      console.log('[vibrate]', id);

      if (!skipVibration && isVibrationSupported()) {
        try {
          navigator.vibrate(pattern)
        } catch {}
      }
    },
    reset: () => {
      if (!notified) {
        return;
      }
      notified = false;
      console.log('[vibrate]', 'cancel', id);
    },
  }
}
