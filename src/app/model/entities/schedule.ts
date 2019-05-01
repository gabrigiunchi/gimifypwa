import {TimeInterval} from './time-interval';

export interface Schedule {
    dayOfWeek: string;
    timeIntervals: TimeInterval[];
}
