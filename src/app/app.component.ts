import {Component} from '@angular/core';
import {LoginService} from './services/server-communication/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private loginService: LoginService) {}

  get isLoading(): boolean {
    return this.loginService.isLoading;
  }
}
