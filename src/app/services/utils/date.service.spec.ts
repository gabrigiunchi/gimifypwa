import {TestBed} from '@angular/core/testing';
import {DateService} from './date.service';

describe('DateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service).toBeTruthy();
  });

  it('should build a date from the localdate and the localtime', () => {
    const service: DateService = TestBed.get(DateService);
    const result = service.build('2019-05-02', '10:00');
    expect(result).toBe('2019-05-02T10:00:00+0200');
  });

  it('should build a date from the localdate and the localtime and the zoneId', () => {
    const service: DateService = TestBed.get(DateService);
    const result = service.build('2019-05-02', '10:00', 'UTC');
    expect(result).toBe('2019-05-02T10:00:00+0000');
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

});
