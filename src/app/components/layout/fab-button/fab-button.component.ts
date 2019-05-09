import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.css']
})
export class FabButtonComponent {

  @Input() icon = 'add';
}
