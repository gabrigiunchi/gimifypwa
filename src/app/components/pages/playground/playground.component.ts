import {Component} from '@angular/core';
import {CONSTANTS} from 'src/app/constants';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent {
  readonly version = CONSTANTS.VERSION;
}
