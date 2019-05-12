import {Component} from '@angular/core';

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

  readonly sections: AppSection[] = [
    {icon: 'search', link: '/search'},
    {icon: 'book', link: '/reservations'},
    {icon: 'fitness_center', link: '/gyms'},
    {icon: 'person', link: '/profile'},
    {icon: 'whatshot', link: '/playground'},
  ];
}
