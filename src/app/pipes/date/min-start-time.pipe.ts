import { Pipe, PipeTransform } from '@angular/core';
import {DateTime} from 'luxon';
import {DateService} from 'src/app/services/utils/date.service';

@Pipe({
  name: 'minStartTime'
})
export class MinStartTimePipe implements PipeTransform {

  constructor(private dateService: DateService) {}

  transform(time: string, currentDate: string, step: number): String {
    if (currentDate === undefined || currentDate == null) {
      return time;
    }
    return DateTime.local().hasSame(DateTime.fromISO(currentDate), 'day') ? this.dateService.roundCurrentTime(step) : time;
  }

}
