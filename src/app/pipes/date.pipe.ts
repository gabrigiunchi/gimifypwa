import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment-timezone';
import {CONSTANTS} from '../constants';

@Pipe({
  name: 'appDate'
})
export class DatePipe implements PipeTransform {

  transform(date: string, format: string, zone: string = CONSTANTS.DEFAULT_TIMEZONE): string {
    return moment.tz(date, zone).format(format);
  }

}
