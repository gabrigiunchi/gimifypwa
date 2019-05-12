import {Component, Input} from '@angular/core';
import {Asset} from 'src/app/model/entities/asset';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {InfoDialogComponent, InfoDialogData} from 'src/app/components/modals/dialogs/info-dialog/info-dialog.component';
import {
  ConfirmReservationDialogComponent,
  ConfirmReservationDialogData
} from 'src/app/components/modals/dialogs/confirm-reservation-dialog/confirm-reservation-dialog.component';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {finalize} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorDialogComponent} from 'src/app/components/modals/dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent {

  @Input() result: Asset[] = [];
  @Input() date: string;
  @Input() from: string;
  @Input() to: string;

  isLoading = false;
  success = false;

  constructor(private router: Router, private dialog: MatDialog, private reservationService: ReservationService) {}

  onBookingClick(asset: Asset) {
    const dialogData: ConfirmReservationDialogData = {
      asset: asset,
      date: this.date,
      from: this.from,
      to: this.to
    };

    this.dialog.open(ConfirmReservationDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: dialogData,
      minWidth: '85%',
      maxWidth: '25rem'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.makeReservation(asset);
      }
    });
  }

  private makeReservation(asset: Asset) {
    this.isLoading = true;
    this.reservationService.addReservation(asset.id, this.date, this.from, this.to)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        () => this.onReservationConfirmed(),
        error => this.onError(error)
      );
  }

  private onError(error: HttpErrorResponse) {
    console.log('Could not make a reservation', error);
    this.dialog.open(ErrorDialogComponent, {data: error, autoFocus: false, restoreFocus: false});
  }

  private onReservationConfirmed() {
    this.success = true;
    const dialogData: InfoDialogData = {title: 'Success!', message: 'You have sucessfully booked the asset'};
    this.dialog.open(InfoDialogComponent, {data: dialogData}).afterClosed().subscribe(() => this.router.navigate(['/reservations']));
  }
}
