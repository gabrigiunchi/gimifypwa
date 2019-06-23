import {inject, TestBed} from '@angular/core/testing';
import {LoginGuard} from './login.guard';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {LoginService} from '../services/server-communication/login.service';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard],
      imports: [HttpClientModule, RouterModule.forRoot([])]
    });
  });

  it('should be created', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should activate', inject([LoginGuard], (guard: LoginGuard) => {
    spyOnProperty(TestBed.get(LoginService), 'isLoggedIn').and.returnValue(true);
    expect(guard.canActivate()).toBe(false);
  }));
});
