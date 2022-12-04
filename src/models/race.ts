import type {Slot} from './slot';

export interface Race {
  slots: Slot[];
  name: string;
  mode: string;
  status: 'running'|'stopped'|'starting';
  time?: string;
  lapsToGo?: number;
}
