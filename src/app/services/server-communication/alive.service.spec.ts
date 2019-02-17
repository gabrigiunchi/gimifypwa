import {TestBed} from '@angular/core/testing';

import {AliveService} from './alive.service';
import {HttpClientModule} from '@angular/common/http';

describe('AliveService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AliveService = TestBed.get(AliveService);
    expect(service).toBeTruthy();
  });
});
