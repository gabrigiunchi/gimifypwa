import {Component} from '@angular/core';
import {CONSTANTS} from 'src/app/constants';
import {AliveService} from 'src/app/services/server-communication/alive.service';
import {LoginService} from 'src/app/services/server-communication/login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  message = '';
  readonly version = CONSTANTS.VERSION;

  constructor(private aliveService: AliveService, private loginService: LoginService) {}

  fetchData() {
    this.aliveService.check().subscribe(result => this.message = 'Wow that is amazing');
  }

  logout() {
    this.loginService.logout();
  }

}
