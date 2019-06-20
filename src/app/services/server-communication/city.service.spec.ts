import {TestBed, async} from '@angular/core/testing';
import {CityService} from './city.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {TestConstants} from 'src/app/test-constants';
import {CONSTANTS} from 'src/app/constants';
import {UrlService} from '../url.service';

describe('CityService', () => {

  let cityService: CityService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    cityService = TestBed.get(CityService);
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeader', 'get').and.returnValue({});
  });

  it('should be created', () => {
    expect(cityService).toBeTruthy();
  });

  it('should get all the cities', async(() => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of([TestConstants.mockCity]));
    cityService.cities.subscribe(result => expect(result).toEqual([TestConstants.mockCity]));
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.CITIES}`, {});
  }));

  it('should get a city by id', async(() => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.mockCity));
    cityService.getCityById(1);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.CITIES}/1`, {});
  }));

});
