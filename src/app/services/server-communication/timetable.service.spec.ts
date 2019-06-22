import {TestBed} from '@angular/core/testing';
import {TimetableService} from './timetable.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TestConstants} from 'src/app/test-constants';
import {UrlService} from '../url.service';
import {of} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';

describe('TimetableService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  beforeEach(() => {
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeader', 'get').and.returnValue({});
  });

  it('should be created', () => {
    const service: TimetableService = TestBed.get(TimetableService);
    expect(service).toBeTruthy();
  });

  it('should get the timetable of a gym', () => {
    const service: TimetableService = TestBed.get(TimetableService);
    const gym = TestConstants.mockGym;
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.mockTimetable));
    service.getTimetableOfGym(gym);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.TIMETABLES}/by_gym/${gym.id}`, {});
  });
});
