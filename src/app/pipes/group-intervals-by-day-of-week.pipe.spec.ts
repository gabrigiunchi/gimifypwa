import {GroupIntervalsByDayOfWeekPipe} from './group-intervals-by-day-of-week.pipe';
import {RepeatedInterval} from '../model/entities/repeated-interval';
import {RepetitionType} from '../model/entities/type/repetition-type';

describe('GroupIntervalsByDayOfWeekPipe', () => {
  it('create an instance', () => {
    const pipe = new GroupIntervalsByDayOfWeekPipe();
    expect(pipe).toBeTruthy();
  });

  it('should group intervals by weekday', () => {
    const pipe = new GroupIntervalsByDayOfWeekPipe();
    const intervals: RepeatedInterval[] = [
      {repetitionType: RepetitionType.none, start: '2019-05-20T10:00:00', end: '2019-05-20T10:30:00'},
      {repetitionType: RepetitionType.weekly, start: '2019-05-20T10:00:00', end: '2019-05-20T10:30:00'},
      {repetitionType: RepetitionType.weekly, start: '2019-05-13T10:00:00', end: '2019-05-13T10:30:00'},
      {repetitionType: RepetitionType.weekly, start: '2019-05-23T10:00:00', end: '2019-05-23T10:30:00'},
      {repetitionType: RepetitionType.weekly, start: '2019-05-23T10:00:00', end: '2019-05-23T10:30:00'},
      {repetitionType: RepetitionType.weekly, start: '2019-05-24T10:00:00', end: '2019-05-24T10:30:00'},
      {repetitionType: RepetitionType.weekly, start: '2019-05-26T10:00:00', end: '2019-05-26T10:30:00'}
    ];

    const result = pipe.transform(intervals);
    expect(result.length).toBe(4);
    expect(result[0].dayOfWeek).toBe(1);
    expect(result[1].dayOfWeek).toBe(4);
    expect(result[2].dayOfWeek).toBe(5);
    expect(result[3].dayOfWeek).toBe(7);

    expect(result[0].timeIntervals.length).toBe(2);
    expect(result[1].timeIntervals.length).toBe(2);
    expect(result[2].timeIntervals.length).toBe(1);
    expect(result[3].timeIntervals.length).toBe(1);
  });
});
