import {Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';

@Pipe({
  name: 'dayOfWeekName'
})
export class DayOfWeekNamePipe implements PipeTransform {

  transform(dayOfWeek: number, locale = 'en'): string {
    return DateTime.fromObject({weekday: dayOfWeek}).setLocale(locale).weekdayLong;
  }

}
