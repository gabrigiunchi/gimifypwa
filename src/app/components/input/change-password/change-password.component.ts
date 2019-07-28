import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SnackbarService} from 'src/app/services/snackbar.service';
import {ChangePasswordDialogComponent} from '../../modals/dialogs/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(private dialog: MatDialog, private snackBar: SnackbarService) {}

  changePassword() {
    this.dialog
      .open(ChangePasswordDialogComponent,
        {
          autoFocus: false,
          restoreFocus: false,
          height: '100%',
          minWidth: '100%'
        }
      )
      .afterClosed()
      .subscribe(
        result => {
          if (result) {
            this.snackBar.show('Password changed successfully');
          }
        });
  }

}
