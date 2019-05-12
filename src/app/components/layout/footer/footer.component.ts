import {Component} from '@angular/core';
import {CONSTANTS} from 'src/app/constants';

export interface AppSection {
  icon: string;
  link: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  readonly sections: AppSection[] = CONSTANTS.SECTIONS;
}
