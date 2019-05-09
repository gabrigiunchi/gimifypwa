import {TestBed} from '@angular/core/testing';
import {GymImageServiceService} from './gym-image-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GymImageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: GymImageServiceService = TestBed.get(GymImageServiceService);
    expect(service).toBeTruthy();
  });
});
