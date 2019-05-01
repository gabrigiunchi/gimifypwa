import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmAction: string;
  cancelAction: string;
  confirmColor: string;
  cancelColor: string;
  vertical: boolean;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  private static readonly _DEFAULT_DATA: ConfirmationDialogData = {
    title: '',
    message: '',
    confirmAction: 'Confirm',
    cancelAction: 'Cancel',
    confirmColor: 'primary',
    cancelColor: 'primary',
    vertical: false
  };

  static get DEFAULT_DATA(): ConfirmationDialogData {
    return Object.assign({}, this._DEFAULT_DATA);
  }

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
    if (data === undefined || data == null) {
      this.data = ConfirmationDialogComponent.DEFAULT_DATA;
    }
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
