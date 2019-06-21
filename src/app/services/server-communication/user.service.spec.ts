import {TestBed, async} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../session.service';
import {TestConstants} from 'src/app/test-constants';
import {UrlService} from '../url.service';
import {of} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserService', () => {

  let userService: UserService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeader', 'get').and.returnValue({});
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should say if an id is the logged user\' id', () => {
    const sessionService: SessionService = TestBed.get(SessionService);
    sessionService.user = TestConstants.mockUser;
    expect(userService.isLoggedUser(1)).toBe(true);
  });

  it('should say if an id is not the logged user\' id', () => {
    localStorage.clear();
    expect(userService.isLoggedUser(1)).toBe(false);
  });

  it('should get the user\'s info', async(() => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.mockUser));
    userService.userInfo.subscribe(result => expect(result).toEqual(TestConstants.mockUser));
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.USERS_URL}/me`, {});
  }));

  it('should enable/disable the notifications', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'patch').and.returnValue(of(TestConstants.mockUser));
    userService.setNotifications(true);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.USERS_URL}/me/notifications/active/true`, {}, {});
  });
});
