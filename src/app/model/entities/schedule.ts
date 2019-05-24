import {TimeInterval} from './time-interval';

export interface Schedule {
  dayOfWeek: number;
  timeIntervals: TimeInterval[];
}
