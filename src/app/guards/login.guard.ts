import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {LoginService} from '../services/server-communication/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService) {
  }

  canActivate(): boolean {
    return !this.loginService.isLoggedIn;
  }

}
