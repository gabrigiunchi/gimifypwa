import {async, TestBed} from '@angular/core/testing';

import {GymService} from './gym.service';
import {HttpClient} from '@angular/common/http';
import {TestConstants} from 'src/app/test-constants';
import {of} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';
import {UrlService} from '../url.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Page} from 'src/app/model/page';
import {Gym} from 'src/app/model/entities/gym';

describe('GymService', () => {
  let gymService: GymService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    gymService = TestBed.get(GymService);
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeader', 'get').and.returnValue({});
  });

  it('should be created', () => {
    const service: GymService = TestBed.get(GymService);
    expect(service).toBeTruthy();
  });

  it('should get all the gyms', async(() => {
    const gyms = [TestConstants.mockGym];
    const mockPage: Page<Gym> = {
      content: gyms,
      empty: false,
      first: true,
      last: true,
      number: 1,
      totalElements: 1,
      totalPages: 1
    };
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(mockPage));
    gymService.gyms.subscribe(result => expect(result).toEqual(gyms));
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.GYMS}/page/0/size/30`, {});
  }));

  it('should get a gym by id', () => {
    const gym = TestConstants.mockGym;
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(gym));
    gymService.getGymById(1);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.GYMS}/1`, {});
  });

  it('should the gyms in a city', () => {
    const city = TestConstants.mockCity;
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of([]));
    gymService.getGymsByCity(city);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.GYMS}/by_city/${city.id}`, {});
  });

  it('should get a the rating of a gym', () => {
    const gym = TestConstants.mockGym;
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(1));
    gymService.getRatingOfGym(gym.id);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.GYMS}/${gym.id}/rating`, {});
  });
});
