import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageKey} from 'src/app/model/local-storage-key';
import {City} from 'src/app/model/entities/city';
import {SessionService} from '../session.service';
import {TestConstants} from 'src/app/test-constants';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should say if an id is the logged user\' id', () => {
    const service: UserService = TestBed.get(UserService);
    const sessionService: SessionService = TestBed.get(SessionService);
    sessionService.user = TestConstants.mockUser;
    expect(service.isLoggedUser(1)).toBe(true);
  });

  it('should say if an id is not the logged user\' id', () => {
    const service: UserService = TestBed.get(UserService);
    localStorage.clear();
    expect(service.isLoggedUser(1)).toBe(false);
  });
});
