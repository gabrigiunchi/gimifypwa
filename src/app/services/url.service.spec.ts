import {TestBed} from '@angular/core/testing';

import {UrlService} from './url.service';
import {CONSTANTS} from '../constants';
import {Token} from '../model/dto/token';
import {SessionService} from './session.service';

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

    it('should get the token', () => {
    const service: UrlService = TestBed.get(UrlService);
    const token: Token = {token: 'dmaskdada', user: undefined};
    spyOnProperty(TestBed.get(SessionService), 'token', 'get').and.returnValue(token.token);
    const result = service.token;
    expect(result.headers.get('Authorization')).toBe(`Bearer ${token.token}`);
  });
});
