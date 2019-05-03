import {TestBed} from '@angular/core/testing';
import {CacheService} from './cache.service';

describe('CacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheService<string> = TestBed.get(CacheService);
    expect(service).toBeTruthy();
  });

  it('should clear the cache', () => {
    const service: CacheService<string> = TestBed.get(CacheService);
    service.element = 'hello';
    expect(service.isPresent).toBe(true);
    expect(service.element).toBeTruthy();
    service.clear();
    expect(service.isPresent).toBe(false);
    expect(service.element).toBeFalsy();
  });
});
