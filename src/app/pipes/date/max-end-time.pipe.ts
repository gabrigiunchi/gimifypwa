import {Pipe, PipeTransform} from '@angular/core';
import {DateTime, Duration} from 'luxon';

@Pipe({
  name: 'maxEndTime',
  pure: false
})
export class MaxEndTimePipe implements PipeTransform {

  transform(startTime: string, step: number, maxTime: string, maxDuration?: Duration): string {
    const max = DateTime.fromFormat(maxTime, 'HH:mm');
    let d = DateTime.fromFormat(startTime, 'HH:mm');

    if (maxDuration) {
      d = d.plus(maxDuration);
      return max.hasSame(d, 'day') ? DateTime.min(max, d).toFormat('HH:mm') : '00:00';
    }

    d = d.plus({minutes: step});

    console.log(d.toISO());
    console.log(max.toISO());
    console.log('-------------');

    return max.hasSame(d, 'day') ? maxTime : '00:00';
  }

}
