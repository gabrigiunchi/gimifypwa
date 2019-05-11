import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Input() title = '';
  @Input() back = './';

  constructor(private router: Router) {}

  onBackClick() {
    this.router.navigate([this.back]);
  }

}
