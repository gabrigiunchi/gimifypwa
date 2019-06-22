import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Asset} from 'src/app/model/entities/asset';
import {CONSTANTS} from 'src/app/constants';

export interface ConfirmReservationDialogData {
  asset: Asset;
  date: string;
  from: string;
  to: string;
}

@Component({
  selector: 'app-confirm-reservation-dialog',
  templateUrl: './confirm-reservation-dialog.component.html',
  styleUrls: ['./confirm-reservation-dialog.component.css']
})
export class ConfirmReservationDialogComponent {

  readonly gymIcon = CONSTANTS.GYM_ICON;

  constructor(
    private dialogRef: MatDialogRef<ConfirmReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmReservationDialogData) {
  }

  dismiss() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

}
