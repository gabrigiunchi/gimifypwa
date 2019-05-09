import {TestBed} from '@angular/core/testing';

import {UrlService} from './url.service';
import {CONSTANTS} from '../constants';

describe('UrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlService = TestBed.get(UrlService);
    expect(service).toBeTruthy();
  });

  it('should get url', () => {
    const service: UrlService = TestBed.get(UrlService);
    expect(service.getRestUrl('/photos/gym1_1.jpg')).toBe(`${CONSTANTS.BASE_URL}/photos/gym1_1.jpg`);
  });
});
