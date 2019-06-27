import {Component, Input} from '@angular/core';
import {ThemePalette} from '@angular/material';

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
  @Input() icon: string;
  @Input() iconSize = '7rem';
  @Input() iconColor: ThemePalette = 'primary';
}
