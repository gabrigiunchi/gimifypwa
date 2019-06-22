import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Asset} from 'src/app/model/entities/asset';
import {CONSTANTS} from 'src/app/constants';

// tslint:disable-next-line: max-line-length

@Component({
  selector: 'app-result-list-item',
  templateUrl: './result-list-item.component.html',
  styleUrls: ['./result-list-item.component.css']
})
export class ResultListItemComponent {

  readonly gymIcon = CONSTANTS.GYM_ICON;
  @Input() asset: Asset;
  @Input() date: string;
  @Input() from: string;
  @Input() to: string;
  @Output() bookingClick = new EventEmitter<Asset>();

  onBookingClick() {
    this.bookingClick.emit(this.asset);
  }
}
