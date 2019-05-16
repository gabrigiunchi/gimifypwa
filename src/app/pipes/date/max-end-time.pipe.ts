import {Pipe, PipeTransform} from '@angular/core';
import {DateTime, Duration} from 'luxon';

@Pipe({
  name: 'maxEndTime',
  pure: false
})
export class MaxEndTimePipe implements PipeTransform {

  transform(startTime: string, maxTime: string, maxDuration: Duration): string {
    const max = DateTime.fromFormat(maxTime, 'HH:mm');
    const d = DateTime.fromFormat(startTime, 'HH:mm').plus(maxDuration);
    return DateTime.min(max, d).toFormat('HH:mm');
  }

}
