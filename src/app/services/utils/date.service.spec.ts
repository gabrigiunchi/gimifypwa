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
});
