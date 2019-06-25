import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/server-communication/user.service';
import {User} from 'src/app/model/entities/user';
import {Observable, of} from 'rxjs';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';
import {LoginService} from 'src/app/services/server-communication/login.service';
import {SnackbarService} from 'src/app/services/snackbar.service';
import {MatDialog, MatSlideToggleChange} from '@angular/material';
import {finalize} from 'rxjs/operators';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {CommentService} from 'src/app/services/server-communication/comment.service';
import {ConfirmationDialogComponent} from '../../modals/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  userInfo$: Observable<User>;
  avatar$: Observable<string>;
  isUpdatingSettings = false;
  reservationsCount$: Observable<number>;
  commentsCount$: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private commentService: CommentService,
    private reservatiosService: ReservationService,
    private snackbarService: SnackbarService,
    private loginService: LoginService,
    private avatarService: AvatarService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.commentsCount$ = this.commentService.myCommentsCount;
    this.reservationsCount$ = this.reservatiosService.myReservationsCount;
    this.userInfo$ = this.userService.userInfo;
    this.avatar$ = of(this.avatarService.myAvatar);
    this.avatarService.avatarChanged$.subscribe(avatar => this.avatar$ = of(avatar));
    this.avatarService.checkAvatar();
  }

  onToggleChange(toggleChange: MatSlideToggleChange) {
    this.setNotifications(toggleChange.checked);
  }

  setNotifications(enabled: boolean) {
    this.isUpdatingSettings = true;
    this.userService.setNotifications(enabled)
      .pipe(finalize(() => this.isUpdatingSettings = false))
      .subscribe(info => {
        this.userInfo$ = of(info);
        this.snackbarService.show('Settings updated');
      });
  }

  onLogoutClick() {
    const dialogData = ConfirmationDialogComponent.DEFAULT_DATA;
    dialogData.confirmAction = 'Logout';
    dialogData.confirmColor = 'warn';
    dialogData.title = 'Logout';
    dialogData.message = 'Do you want to log out?';
    this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      width: '20rem',
      data: dialogData
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.loginService.logout();
      }
    });
  }
}
