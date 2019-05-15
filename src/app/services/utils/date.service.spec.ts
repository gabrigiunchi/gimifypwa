import {TestBed} from '@angular/core/testing';
import {DateService} from './date.service';
import {DateTime, Duration} from 'luxon';
import {MatNativeDateModule} from '@angular/material';

describe('DateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatNativeDateModule]
  }));

  const duration = (minutes: number) => Duration.fromObject({minutes: minutes});

  it('should be created', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service).toBeTruthy();
  });

  it('should say if a date is today', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service.isToday(DateTime.local().toISODate())).toBe(true);
    expect(service.isToday('2019-05-10')).toBe(false);
    expect(service.isToday(DateTime.local().plus({days: 1}).toISODate())).toBe(false);
    expect(service.isToday(DateTime.local().minus({days: 1}).toISODate())).toBe(false);
  });

  it('should build a date from the localdate and the localtime', () => {
    const service: DateService = TestBed.get(DateService);
    const result = service.build('2019-05-02', '10:00');
    expect(result).toBe('2019-05-02T10:00:00+0200');
  });

  it('should build a date from the localdate and the localtime and the zoneId', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service.build('2019-05-02', '10:00', 'UTC')).toBe('2019-05-02T10:00:00+0000');
    expect(service.build('2019-05-02', '10:00', 'Europe/Rome')).toBe('2019-05-02T10:00:00+0200');
    expect(service.build('2019-05-02', '10:00', 'America/New_York')).toBe('2019-05-02T10:00:00-0400');
  });

  it('should round up time', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service.round('10:20', 30)).toBe('10:30');
    expect(service.round('10:35', 30)).toBe('11:00');
    expect(service.round('10:50', 30)).toBe('11:00');
    expect(service.round('10:25', 30)).toBe('10:30');
    expect(service.round('10:30', 30)).toBe('10:30');
    expect(service.round('10:15', 30)).toBe('10:30');
    expect(service.round('10:00', 30)).toBe('10:00');
    expect(service.round('10:20', 20)).toBe('10:20');
    expect(service.round('10:10', 20)).toBe('10:20');
    expect(service.round('10:20', 15)).toBe('10:30');
    expect(service.round('10:25', 15)).toBe('10:30');
    expect(service.round('10:15', 15)).toBe('10:15');
    expect(service.round('10:45', 20)).toBe('11:00');
  });

  it('should say if a range is valid', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service.isRangeValid('10:00', '10:20', duration(30))).toBe(true);
    expect(service.isRangeValid('10:00', '10:20', duration(20))).toBe(true);
    expect(service.isRangeValid('10:50', '11:10', duration(20))).toBe(true);
    expect(service.isRangeValid('10:00', '11:20', duration(120))).toBe(true);
  });

  it('should say if a range is not valid', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service.isRangeValid('10:00', '10:31', duration(30))).toBe(false);
    expect(service.isRangeValid('10:00', '10:20', duration(19))).toBe(false);
    expect(service.isRangeValid('10:00', '12:00', duration(60))).toBe(false);
  });

});
