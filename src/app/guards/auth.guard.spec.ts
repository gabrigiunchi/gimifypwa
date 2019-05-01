import {inject, TestBed} from '@angular/core/testing';
import {AuthGuard} from './auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {Router, RouterModule} from '@angular/router';
import {LoginService} from '../services/server-communication/login.service';
import {SessionService} from '../services/session.service';
import {of} from 'rxjs';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [HttpClientModule, RouterModule.forRoot([])]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should activate if the user is already logged in', inject([AuthGuard], (guard: AuthGuard) => {
    const loginService: LoginService = TestBed.get(LoginService);
    spyOnProperty(loginService, 'isLoggedIn', 'get').and.returnValue(true);
    guard.checkLogin('').subscribe(result => expect(result).toBe(true));
  }));

  it('should activate if the user is not logged in but there is a valid token', inject([AuthGuard], (guard: AuthGuard) => {
    const loginService: LoginService = TestBed.get(LoginService);
    const sessionService: SessionService = TestBed.get(SessionService);
    sessionService.token = 'djsanjkdna';
    spyOnProperty(loginService, 'isLoggedIn', 'get').and.returnValue(false);
    spyOn(loginService, 'checkToken').and.returnValue(of(true));
    guard.checkLogin('').subscribe(result => expect(result).toBe(true));
  }));

  it('should redirect to login if the user is not logged and there is not a valid token', inject([AuthGuard], (guard: AuthGuard) => {
    const loginService: LoginService = TestBed.get(LoginService);
    const sessionService: SessionService = TestBed.get(SessionService);
    sessionService.clear();
    spyOnProperty(loginService, 'isLoggedIn', 'get').and.returnValue(false);
    spyOn(TestBed.get(Router), 'navigateByUrl').and.callFake(() => {
    });
    guard.checkLogin('abcde').subscribe(result => {
      expect(result).toBe(false);
      expect(loginService.redirectUrl).toBe('abcde');
    });
  }));

});
