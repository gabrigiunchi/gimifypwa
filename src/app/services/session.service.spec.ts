import {TestBed} from '@angular/core/testing';
import {SessionService} from './session.service';
import {LocalStorageKey} from '../model/local-storage-key';

describe('SessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionService = TestBed.get(SessionService);
    expect(service).toBeTruthy();
  });

  it('should save a token', () => {
    const service: SessionService = TestBed.get(SessionService);
    service.token = 'abcde';
    expect(service.token).toBe('abcde');
    expect(localStorage.getItem(LocalStorageKey.token)).toBe('abcde');
  });

  it('should cler the localstorage', () => {
    const service: SessionService = TestBed.get(SessionService);
    service.clear();
    expect(localStorage.length).toBe(0);
  });
});
