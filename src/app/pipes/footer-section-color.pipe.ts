import { Pipe, PipeTransform } from '@angular/core';
import {AppSection} from '../components/layout/footer/footer.component';
import {ThemePalette} from '@angular/material';
import {Router} from '@angular/router';

@Pipe({
  name: 'footerSectionColor',
  pure: false
})
export class FooterSectionColorPipe implements PipeTransform {

  constructor(private router: Router) {}

  transform(section: AppSection): ThemePalette {
    return this.router.url.startsWith(section.link) ? 'primary' : undefined;
  }

}
