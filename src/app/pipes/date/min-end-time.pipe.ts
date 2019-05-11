import {Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';

@Pipe({
  name: 'minEndTime'
})
export class MinEndTimePipe implements PipeTransform {

  transform(startTime: string, step: number): string {
    return DateTime.fromFormat(startTime, 'HH:mm').plus({minutes: step}).toFormat('HH:mm');
  }

}
