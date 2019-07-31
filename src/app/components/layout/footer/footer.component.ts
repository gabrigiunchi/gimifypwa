import {Component} from '@angular/core';
import {CONSTANTS} from 'src/app/constants';
import {AppSection} from 'src/app/model/app-section';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  readonly sections: AppSection[] = CONSTANTS.SECTIONS;

  constructor(private router: Router) {}

  navigate(section: AppSection) {
    this.router.navigateByUrl(section.link);
  }
}
