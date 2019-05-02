import {Pipe, PipeTransform} from '@angular/core';
import {CONSTANTS} from '../../constants';
import {DateTime} from 'luxon';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(date: string, zoneId: string = CONSTANTS.DEFAULT_TIMEZONE): string {
    return DateTime.fromISO(date, {zone: zoneId}).toLocaleString(DateTime.TIME_24_SIMPLE);
  }

}
