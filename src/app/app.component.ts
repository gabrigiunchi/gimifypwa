import {Component} from '@angular/core';
import {LoginService} from './services/server-communication/login.service';
import {Router} from '@angular/router';
import {CONSTANTS} from './constants';
import {DateService} from './services/utils/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private dateService: DateService,
    private router: Router,
    private loginService: LoginService) {

      this.dateService.init();
  }

  get isLoading(): boolean {
    return this.loginService.isLoading;
  }

  get showFooter(): boolean {
    return CONSTANTS.MAIN_PAGES.includes(this.router.url);
  }
}
