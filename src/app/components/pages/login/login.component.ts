import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/services/server-communication/login.service';
import {SnackbarService} from 'src/app/services/snackbar.service';
import {finalize} from 'rxjs/operators';

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
    private snackbarService: SnackbarService,
    private loginService: LoginService,
    private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.isLoading = true;
    this.loginService.login(this.username, this.password)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        loggedIn => {
          if (loggedIn) {
            const url = this.loginService.redirectUrl ? this.loginService.redirectUrl : '/home';
            this.router.navigate([url]);
          }
        },
        () => {
          console.log('Login failed');
          this.snackbarService.show('Username and/or password incorrect');
        });
  }

  private get username(): string {
    return this.loginForm.get('username').value;
  }

  private get password(): string {
    return this.loginForm.get('password').value;
  }
}
