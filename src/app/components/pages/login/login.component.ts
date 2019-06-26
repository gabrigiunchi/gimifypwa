import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/services/server-communication/login.service';
import {finalize} from 'rxjs/operators';
import {CONSTANTS} from 'src/app/constants';
import {ErrorDialogComponent} from '../../modals/dialogs/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  isLoading = false;

  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.isLoading = true;
    this.loginService.login(this.username, this.password)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        loggedIn => {
          if (loggedIn) {
            const url = this.loginService.redirectUrl ? this.loginService.redirectUrl : CONSTANTS.HOMEPAGE;
            this.router.navigate([url]);
          }
        },
        () => {
          console.log('Login failed');
          this.showLoginError();
        });
  }

  private get username(): string {
    return this.loginForm.get('username').value;
  }

  private get password(): string {
    return this.loginForm.get('password').value;
  }

  private showLoginError() {
    this.dialog.open(ErrorDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: 'Username and/or password incorrect'
  });
  }
}
