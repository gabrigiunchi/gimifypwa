import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Asset} from 'src/app/model/entities/asset';

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
