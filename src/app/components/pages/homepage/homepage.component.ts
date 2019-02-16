import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from 'src/app/constants';
import {LoginService} from 'src/app/services/server-communication/login.service';
import {UserService} from 'src/app/services/server-communication/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  message = '';
  readonly version = CONSTANTS.VERSION;

  constructor(
    private userService: UserService,
    private loginService: LoginService) { }

  ngOnInit() {
    // this.loginService.login().subscribe(() => this.getUsers());
  }

  private getUsers() {
    this.userService.getUsers().subscribe(result => console.log(result));
  }

}
