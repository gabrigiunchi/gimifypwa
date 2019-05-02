import {Pipe, PipeTransform} from '@angular/core';
import {CONSTANTS} from '../constants';
import {DateTime} from '../model/utils/date-time';

@Pipe({
  name: 'appDate'
})
export class DatePipe implements PipeTransform {

  transform(date: string, format: string, zone: string = CONSTANTS.DEFAULT_TIMEZONE): string {
    return new DateTime(date).format(format, zone);
  }

}
