import {Pipe, PipeTransform} from '@angular/core';
import {DateTime, Settings} from 'luxon';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(date: string, format: string, zoneId: string = Settings.defaultZoneName): string {
    return DateTime.fromISO(date, {zone: zoneId}).toFormat(format);
  }

}
