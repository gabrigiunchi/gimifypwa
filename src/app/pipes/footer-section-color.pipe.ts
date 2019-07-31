import {Pipe, PipeTransform} from '@angular/core';
import {Router} from '@angular/router';
import {AppSection} from '../model/app-section';

@Pipe({
  name: 'footerSectionColor',
  pure: false
})
export class FooterSectionColorPipe implements PipeTransform {

  constructor(private router: Router) {}

  transform(section: AppSection): string {
    return this.router.url.startsWith(section.link) ? '#3f51b5' : 'black';
  }

}
