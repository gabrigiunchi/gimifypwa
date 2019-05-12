import {MinStartTimePipe} from './min-start-time.pipe';
import {TestBed} from '@angular/core/testing';
import {DateService} from 'src/app/services/utils/date.service';
import {DateTime} from 'luxon';

describe('MinStartTimePipe', () => {
  it('create an instance', () => {
    const pipe = new MinStartTimePipe(TestBed.get(DateService));
    expect(pipe).toBeTruthy();
  });

  it('the min time should be the current time if the date is today', () => {
    const dateService: DateService = TestBed.get(DateService);
    const pipe = new MinStartTimePipe(dateService);
    expect(pipe.transform('00:00', DateTime.local().toISODate(), 30)).toBe(dateService.roundCurrentTime(30));
  });

  it('the min time should be the usual min time if the date is not today', () => {
    const dateService: DateService = TestBed.get(DateService);
    const pipe = new MinStartTimePipe(dateService);
    expect(pipe.transform('00:00', DateTime.local().plus({days: 1}).toISODate(), 30)).toBe('00:00');
  });

  it('the min time should be the usual min time if the date null or undefined', () => {
    const dateService: DateService = TestBed.get(DateService);
    const pipe = new MinStartTimePipe(dateService);
    expect(pipe.transform('00:00', undefined, 30)).toBe('00:00');
    expect(pipe.transform('00:00', undefined, 30)).toBe('00:00');
  });
});
