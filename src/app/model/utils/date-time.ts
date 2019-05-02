import * as moment from 'moment-timezone';
import {CONSTANTS} from 'src/app/constants';

export class DateTime {
  constructor(private date: string) {
  }

  add(quantity: number, granularity: string): DateTime {
    return new DateTime(moment(this.date).add(quantity, granularity).format());
  }

  addMinutes(quantity: number): DateTime {
    return this.add(quantity, 'minutes');
  }

  isBefore(date: string): boolean {
    return moment(this.date).isBefore(moment(date));
  }

  isSameOrBefore(date: string): boolean {
    return moment(this.date).isSameOrBefore(moment(date));
  }

  isAfter(date: string): boolean {
    return moment(this.date).isAfter(moment(date));
  }

  isSameOrAfter(date: string): boolean {
    return moment(this.date).isSameOrAfter(moment(date));
  }

  isBetween(start: string, end: string): boolean {
    return moment(this.date).isBetween(moment(start), moment(end));
  }

  format(
    pattern: string = CONSTANTS.DEFAULT_DATETIME_FORMAT,
    zoneId: string = CONSTANTS.DEFAULT_TIMEZONE): string {

    return moment.tz(this.date, zoneId).format(pattern);
  }

}
