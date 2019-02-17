import {TestBed} from '@angular/core/testing';

import {AliveService} from './alive.service';

describe('AliveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AliveService = TestBed.get(AliveService);
    expect(service).toBeTruthy();
  });
});
