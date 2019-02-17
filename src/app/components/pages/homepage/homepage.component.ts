import {Component} from '@angular/core';
import {CONSTANTS} from 'src/app/constants';
import {AliveService} from 'src/app/services/server-communication/alive.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  message = '';
  readonly version = CONSTANTS.VERSION;

  constructor(private aliveService: AliveService) {}

  fetchData() {
    this.aliveService.check().subscribe(result => this.message = 'Wow that is amazing');
  }

}
