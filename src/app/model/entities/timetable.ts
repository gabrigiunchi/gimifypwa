import {Gym} from './gym';
import {Schedule} from './schedule';
import {DateInterval} from './date-interval';

export interface Timetable {
  gym: Gym;
  openings: Schedule[];
  closingDays: DateInterval[];
  exceptionalOpenings: DateInterval[];
  recurringExceptions: string;
}
