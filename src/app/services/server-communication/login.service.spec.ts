import {TestBed, async} from '@angular/core/testing';
import {LoginService} from './login.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {RouterModule, Router} from '@angular/router';
import {of} from 'rxjs';
import {Token} from 'src/app/model/dto/token';
import {SessionService} from '../session.service';
import {UrlService} from '../url.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterModule.forRoot([])]
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  it('should save the token on login success', async(() => {
    const sessionService: SessionService = TestBed.get(SessionService);
    const service: LoginService = TestBed.get(LoginService);
    const token: Token = {token: 'djsadsad', username: 'gabrigiunchi'};
    spyOn(TestBed.get(HttpClient), 'post').and.returnValue(of(token));
    spyOn(TestBed.get(UrlService), 'getRestUrl').and.returnValue('server/login');
    service.login('gabrigiunchi', 'password').subscribe(() => {
      expect(service.isLoggedIn).toBe(true);
      expect(service.isLoading).toBe(false);
      expect(sessionService.token).toBe(token.token);
    });
  }));

  it('should check the token (valid)', async(() => {
    const service: LoginService = TestBed.get(LoginService);
    spyOn(TestBed.get(HttpClient), 'post').and.returnValue(of(true));
    spyOn(TestBed.get(UrlService), 'getRestUrl').and.returnValue('server/login');
    service.checkToken('daskjdnasjd').subscribe(() => {
      expect(service.isLoggedIn).toBe(true);
      expect(service.isLoading).toBe(false);
    });
  }));

  it('should check the token (invalid)', async(() => {
    const service: LoginService = TestBed.get(LoginService);
    spyOn(TestBed.get(HttpClient), 'post').and.returnValue(of(false));
    spyOn(TestBed.get(UrlService), 'getRestUrl').and.returnValue('server/login');
    service.checkToken('daskjdnasjd').subscribe(() => {
      expect(service.isLoggedIn).toBe(false);
      expect(service.isLoading).toBe(false);
    });
  }));

  it('should logout', () => {
    const sessionService: SessionService = TestBed.get(SessionService);
    const service: LoginService = TestBed.get(LoginService);
    const spy = spyOn(TestBed.get(Router), 'navigateByUrl').and.callFake(() => {});
    sessionService.token = 'jadjsadas';
    service.logout();
    expect(spy).toHaveBeenCalledWith('/login');
    expect(sessionService.token).toBeFalsy();
    expect(service.isLoggedIn).toBe(false);
    expect(service.isLoading).toBe(false);
  });
});
