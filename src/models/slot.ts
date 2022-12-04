import type {Car} from './car';

export interface Slot {
  id: string;
  name: string;
  image?: string;
  car?: Car;
  inPit: boolean;
  position?: number;
  lap?: number;
  lapsToGo?: number;
  lastLap?: {
    time?: number,
  }
  fastestLap?: {
    time?: number;
    lap?: number;
  }
  remainingGas?: number;
  penalty?: 'unknown'|'pit';
}
