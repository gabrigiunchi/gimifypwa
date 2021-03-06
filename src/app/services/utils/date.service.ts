import {Injectable} from '@angular/core';
import {CONSTANTS} from 'src/app/constants';
import {DateTime, Duration, Settings} from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  set timezone(zoneId: string) {
    Settings.defaultZoneName = zoneId;
  }

  isToday(date: string): boolean {
    return DateTime.fromISO(date).hasSame(DateTime.local(), 'day');
  }

  build(date: string, hour: string): string {
    return DateTime
      .fromFormat(`${date} ${hour}`, 'yyyy-MM-dd HH:mm')
      .toFormat(CONSTANTS.DEFAULT_DATETIME_FORMAT);
  }

  isRangeValid(start: string, end: string, maxDuration: Duration): boolean {
    return Duration.fromMillis(DateTime.fromISO(end).toMillis() - DateTime.fromISO(start).toMillis()) <= maxDuration;
  }

  /**
  * Round a time based on the step attribute, for instance
  *
  * time=10:10, step=30 => 10:30
  * time=10:31, step=30 => 11:00
  * time=10:20, step=20 => 10:20
  * time=10:25, step=20 => 10:40
  * time=10:30, step=15 => 10:30
  * time=10:35, step=15 => 10:45
  *
  * and so on
  * @param time time in the format HH:mm
  * @param step step in minutes
  * @returns rounded time in the format HH:mm
  */
  round(time: string, step: number): string {
    const dateTime = DateTime.fromISO(time);
    const minutes = dateTime.minute;

    // If the minutes is a multiple of step then the time is already rounded up
    if (minutes % step === 0) {
      return time;
    }

    const rounded = Math.ceil(minutes / step) * step;
    return dateTime.set({minute: 0}).plus({minutes: rounded}).toFormat('HH:mm');
  }

  roundCurrentTime(step: number): string {
    return this.round(DateTime.local().toFormat('HH:mm'), step);
  }

}
