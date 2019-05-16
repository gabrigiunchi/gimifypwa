import {Pipe, PipeTransform} from '@angular/core';
import {DateTime, Settings} from 'luxon';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(date: string, zoneId: string = Settings.defaultZoneName): string {
    return DateTime.fromISO(date, {zone: zoneId}).toLocaleString(DateTime.TIME_24_SIMPLE);
  }

}
