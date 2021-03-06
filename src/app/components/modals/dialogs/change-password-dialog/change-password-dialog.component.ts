import {Component} from '@angular/core';
import {ErrorStateMatcher, MatDialog, MatDialogRef} from '@angular/material';
import {UserService} from 'src/app/services/server-communication/user.service';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';
import {finalize} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

export function newPasswordValidator(newPasswordControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return control.value !== newPasswordControl.value ? {'notEqual': true} : null;
  };
}

export class NewPasswordErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent {

  oldPasswordControl = new FormControl('', [Validators.required]);
  newPasswordControl = new FormControl('', [Validators.required]);
  newPasswordRepeatControl = new FormControl('', [Validators.required, newPasswordValidator(this.newPasswordControl)]);
  newPasswordErrorMatcher = new NewPasswordErrorMatcher();
  form = new FormGroup({
    oldPassword: this.oldPasswordControl,
    newPassword: this.newPasswordControl,
    newPasswordRepeat: this.newPasswordRepeatControl
  });
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private dialog: MatDialog,
    private userService: UserService) {}

  close() {
    this.dialogRef.close(false);
  }

  submit() {
    this.isLoading = true;
    this.userService
      .changePassword({newPassword: this.form.get('newPassword').value, oldPassword: this.form.get('oldPassword').value})
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        () => this.dialogRef.close(true),
        error => this.onError(error)
      );
  }

  private onError(error: HttpErrorResponse) {
    this.dialog.open(ErrorDialogComponent, {autoFocus: false, restoreFocus: false, data: error});
  }
}
