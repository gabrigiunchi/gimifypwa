import {Pipe, PipeTransform} from '@angular/core';
import {RepeatedInterval} from '../model/entities/repeated-interval';
import {Schedule} from '../model/entities/schedule';
import {DateTime} from 'luxon';
import {RepetitionType} from '../model/entities/type/repetition-type';

@Pipe({
  name: 'groupIntervalsByDayOfWeek'
})
export class GroupIntervalsByDayOfWeekPipe implements PipeTransform {

  transform(intervals: RepeatedInterval[], ascending = true): Schedule[] {
    const map = new Map<number, Schedule>();

    intervals.filter(i => i.repetitionType === RepetitionType.weekly).forEach(interval => {
      const weekDay = this.getDayOfWeek(interval.start);

      if (!map.has(weekDay)) {
        map.set(weekDay, {dayOfWeek: weekDay, timeIntervals: []});
      }

      map.get(weekDay).timeIntervals.push({start: interval.start, end: interval.end});
    });

    const result = Array.from(map.values()).sort((a, b) => a.dayOfWeek - b.dayOfWeek);

    return ascending ? result : result.reverse();
  }


  private getDayOfWeek(date: string): number {
    return DateTime.fromISO(date).weekday;
  }
}
