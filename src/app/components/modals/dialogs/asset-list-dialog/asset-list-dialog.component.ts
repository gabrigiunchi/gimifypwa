import {Component, Inject} from '@angular/core';
import {Asset} from 'src/app/model/entities/asset';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {
  ConfirmReservationDialogComponent,
  ConfirmReservationDialogData
} from '../confirm-reservation-dialog/confirm-reservation-dialog.component';
import {InfoDialogComponent, InfoDialogData} from '../info-dialog/info-dialog.component';
import {HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';

export interface AssetListDialogData {
  assets: Asset[];
  date: string;
  from: string;
  to: string;
}

@Component({
  selector: 'app-asset-list-dialog',
  templateUrl: './asset-list-dialog.component.html',
  styleUrls: ['./asset-list-dialog.component.css']
})
export class AssetListDialogComponent {
  isLoading = false;
  success = false;
  gymName: string;

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AssetListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssetListDialogData) {

    this.gymName = data.assets[0].gym.name;
  }

  dismiss() {
    this.dialogRef.close();
  }

  onBookingClick(asset: Asset) {
    const dialogData: ConfirmReservationDialogData = {
      asset: asset,
      date: this.data.date,
      from: this.data.from,
      to: this.data.to
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
    this.reservationService.addReservation(asset.id, this.data.date, this.data.from, this.data.to)
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
    this.dialog.open(InfoDialogComponent, {data: dialogData}).afterClosed().subscribe(() => {
      this.dismiss();
      this.router.navigate(['/reservations']);
    });
  }


}
