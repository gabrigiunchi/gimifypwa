import {Component, Input} from '@angular/core';
import {ThemePalette} from '@angular/material';
import {CONSTANTS} from 'src/app/constants';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() message = '';
  @Input() marginTop = '3rem';
  @Input() icon = CONSTANTS.KIWI_BIRD_ICON;
  @Input() iconSize = '7rem';
  @Input() iconColor: ThemePalette = 'primary';
  @Input() localIcon = true;
  @Input() showIcon = false;
}
