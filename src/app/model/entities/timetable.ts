import {Gym} from './gym';
import {RepeatedInterval} from './repeated-interval';

export interface Timetable {
  gym: Gym;
  openings: RepeatedInterval[];
  closingDays: RepeatedInterval[];
}
