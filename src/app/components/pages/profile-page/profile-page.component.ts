import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/server-communication/user.service';
import {User} from 'src/app/model/entities/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  userInfo$: Observable<User>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userInfo$ = this.userService.userInfo;
  }

}
