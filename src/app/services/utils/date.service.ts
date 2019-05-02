import {Injectable} from '@angular/core';
import {CONSTANTS} from 'src/app/constants';
import {DatePipe} from 'src/app/pipes/date.pipe';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {}

  build(date: string, hour: string): string {
    return new DatePipe().transform(`${date} ${hour}`, CONSTANTS.DEFAULT_DATETIME_FORMAT);
  }
}
