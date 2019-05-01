import { TestBed } from '@angular/core/testing';

import { GymService } from './gym.service';
import {HttpClientModule} from '@angular/common/http';

describe('GymService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: GymService = TestBed.get(GymService);
    expect(service).toBeTruthy();
  });
});
