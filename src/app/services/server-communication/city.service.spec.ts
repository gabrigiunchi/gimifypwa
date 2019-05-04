import {TestBed} from '@angular/core/testing';
import {CityService} from './city.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: CityService = TestBed.get(CityService);
    expect(service).toBeTruthy();
  });
});
