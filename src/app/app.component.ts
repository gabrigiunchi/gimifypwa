import {Component} from '@angular/core';
import {LoginService} from './services/server-communication/login.service';
import {Router} from '@angular/router';
import {CONSTANTS} from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    private loginService: LoginService) {
  }

  get isLoading(): boolean {
    return this.loginService.isLoading;
  }

  get showFooter(): boolean {
    return CONSTANTS.MAIN_PAGES.includes(this.router.url);
  }
}
