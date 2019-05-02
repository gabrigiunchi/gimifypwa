import {Injectable} from '@angular/core';
import {CONSTANTS} from 'src/app/constants';
import {DateTime} from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
  }

  build(date: string, hour: string): string {
    return DateTime
      .fromFormat(`${date} ${hour}`, 'yyyy-MM-dd HH:mm')
      .setZone(CONSTANTS.DEFAULT_TIMEZONE)
      .toFormat(CONSTANTS.DEFAULT_DATETIME_FORMAT);
  }
}
