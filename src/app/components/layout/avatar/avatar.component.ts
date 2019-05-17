import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  @Input() avatar: string;
  @Input() size = 6;
  @Input() borderColor = '#383d3c';
  @Output() avatarClick = new EventEmitter();

  onAvatarClick(): void {
    this.avatarClick.emit();
  }

  get dimension(): string {
    return this.size + 'rem';
  }
}
