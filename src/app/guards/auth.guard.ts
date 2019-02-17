import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SessionService} from '../services/session.service';
import {LoginService} from '../services/server-communication/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private loginService: LoginService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> {
    if (this.loginService.isLoggedIn) {
      return of(true);
    }

    console.log('User is not logged in, check if there is a saved token');

    if (this.sessionService.token) {
      console.log('Token found, checking if it is valid');
      return this.loginService.checkToken(this.sessionService.token).pipe(
        tap(result => {
          if (result) {
            console.log('Token valid');
          } else {
            console.log('Token invalid, redirect to login');
            this.loginService.redirectUrl = url;
            this.router.navigateByUrl('/login');
          }
        })
      );
    }

    console.log('Token not found, redirect to login');
    this.loginService.redirectUrl = url;
    this.router.navigateByUrl('/login');
    return of(false);
  }
}
