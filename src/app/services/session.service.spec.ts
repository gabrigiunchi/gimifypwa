import {TestBed} from '@angular/core/testing';
import {SessionService} from './session.service';
import {LocalStorageKey} from '../model/local-storage-key';
import {TestConstants} from '../test-constants';
import {User} from '../model/entities/user';

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

  it('should clear the localstorage', () => {
    const service: SessionService = TestBed.get(SessionService);
    service.clear();
    expect(localStorage.length).toBe(0);
  });

  it('should save the user', () => {
    const service: SessionService = TestBed.get(SessionService);
    service.clear();
    service.user = TestConstants.mockUser;
    const saved: User = JSON.parse(localStorage.getItem('user'));
    const expected = TestConstants.mockUser;
    expect(saved.id).toBe(expected.id);
    expect(saved.name).toBe(expected.name);
    expect(saved.surname).toBe(expected.surname);
    expect(saved.username).toBe(expected.username);
    expect(saved.email).toBe(expected.email);
    expect(saved.notificationsEnabled).toBe(expected.notificationsEnabled);
  });

  it('should get the user', () => {
    const service: SessionService = TestBed.get(SessionService);
    service.clear();
    service.user = TestConstants.mockUser;
    const saved: User = service.user;
    const expected = TestConstants.mockUser;
    expect(saved.id).toBe(expected.id);
    expect(saved.name).toBe(expected.name);
    expect(saved.surname).toBe(expected.surname);
    expect(saved.username).toBe(expected.username);
    expect(saved.email).toBe(expected.email);
    expect(saved.notificationsEnabled).toBe(expected.notificationsEnabled);
  });
});
