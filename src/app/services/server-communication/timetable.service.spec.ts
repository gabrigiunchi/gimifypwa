import {TestBed} from '@angular/core/testing';
import {TimetableService} from './timetable.service';
import {HttpClientModule} from '@angular/common/http';

describe('TimetableService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: TimetableService = TestBed.get(TimetableService);
    expect(service).toBeTruthy();
  });
});
