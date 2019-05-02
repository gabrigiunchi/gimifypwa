import {Pipe, PipeTransform} from '@angular/core';
import {CONSTANTS} from '../constants';
import {DateTime} from 'luxon';

@Pipe({
  name: 'appDate'
})
export class DatePipe implements PipeTransform {

  transform(date: string, format: string, zoneId: string = CONSTANTS.DEFAULT_TIMEZONE): string {
    return DateTime.fromISO(date, {zone: zoneId}).toFormat(format);
  }

}
