import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.css']
})
export class RatingBarComponent {

  static readonly FILL_COLOR = '#f4bc42';
  static readonly EMPTY_COLOR = 'grey';

  @Input() max = 5;
  @Input() value = 0;
  @Input() size = '1rem';

  get result(): string[] {
    const result = [];
    for (let i = 0; i < this.max; i++) {
      result.push(i < Math.floor(this.value) ? RatingBarComponent.FILL_COLOR : RatingBarComponent.EMPTY_COLOR);
    }

    return result;
  }

}
