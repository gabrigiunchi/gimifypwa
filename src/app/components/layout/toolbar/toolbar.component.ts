import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ThemePalette} from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Input() title = '';
  @Input() back: string;
  @Input() color: ThemePalette;
  @Output() backClick = new EventEmitter();

  constructor(private router: Router) {}

  onBackClick() {
    this.backClick.emit();
    this.router.navigate([this.back]);
  }

}
