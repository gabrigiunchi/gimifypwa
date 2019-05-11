import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Asset} from 'src/app/model/entities/asset';
import {MatDialog} from '@angular/material';
// tslint:disable-next-line: max-line-length
import {ConfirmReservationDialogData, ConfirmReservationDialogComponent} from 'src/app/components/modals/dialogs/confirm-reservation-dialog/confirm-reservation-dialog.component';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-result-list-item',
  templateUrl: './result-list-item.component.html',
  styleUrls: ['./result-list-item.component.css']
})
export class ResultListItemComponent {

  @Input() asset: Asset;
  @Input() date: string;
  @Input() from: string;
  @Input() to: string;
  @Output() bookingClick = new EventEmitter<Asset>();

  onBookingClick() {
    this.bookingClick.emit(this.asset);
  }
}
