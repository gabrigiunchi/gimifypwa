import {TimeInterval} from './time-interval';

export interface Schedule {
  id: number;
  dayOfWeek: string;
  timeIntervals: TimeInterval[];
}
