import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/services/server-communication/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('gabrigiunchi', [Validators.required, Validators.email]),
    password: new FormControl('aaaa', [Validators.required])
  });

  isLoading = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.isLoading = true;
    this.loginService.login(this.username, this.password).subscribe(loggedIn => {
      this.isLoading = false;
      if (loggedIn) {
        const url = this.loginService.redirectUrl ? this.loginService.redirectUrl : '/home';
        this.router.navigate([url]);
      }
    });
  }

  private get username(): string {
    return this.loginForm.get('username').value;
  }

  private get password(): string {
    return this.loginForm.get('password').value;
  }
}
