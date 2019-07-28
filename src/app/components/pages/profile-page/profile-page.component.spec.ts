import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfilePageComponent} from './profile-page.component';
import {HttpClientModule} from '@angular/common/http';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';
import {of} from 'rxjs';
import {AvatarComponent} from '../../layout/avatar/avatar.component';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {
  MatDialog,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  NativeDateModule
} from '@angular/material';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {RouterModule} from '@angular/router';
import {DefaultCityPickerComponent} from '../../input/default-city-picker/default-city-picker.component';
import {DefaultGymPickerComponent} from '../../input/default-gym-picker/default-gym-picker.component';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {LoginService} from 'src/app/services/server-communication/login.service';
import {UserService} from 'src/app/services/server-communication/user.service';
import {User} from 'src/app/model/entities/user';
import {SnackbarService} from 'src/app/services/snackbar.service';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {CommentService} from 'src/app/services/server-communication/comment.service';
import {AvatarModule} from 'ngx-avatar';
import {ChangePasswordComponent} from '../../input/change-password/change-password.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfilePageComponent,
        AvatarComponent,
        SafeUrlPipe,
        DefaultCityPickerComponent,
        LoadingComponent,
        DefaultGymPickerComponent,
        ToolbarComponent,
        ChangePasswordComponent
      ],
      imports: [
        HttpClientModule,
        MatIconModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatDialogModule,
        AvatarModule,
        MatToolbarModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([]),
        NativeDateModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const avatarService = TestBed.get(AvatarService);
    spyOnProperty(TestBed.get(UserService), 'userInfo').and.returnValue(of(TestConstants.mockUser));
    spyOnProperty(TestBed.get(ReservationService), 'myReservationsCount', 'get').and.returnValue(of(1));
    spyOnProperty(TestBed.get(CommentService), 'myCommentsCount', 'get').and.returnValue(of(1));
    spyOnProperty(avatarService, 'myAvatar', 'get').and.returnValue('');
    spyOn(avatarService, 'checkAvatar').and.callFake(() => {});
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const spyOnLoginService = spyOn(TestBed.get(LoginService), 'logout').and.callFake(() => {});
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(true));
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.onLogoutClick();
    expect(spyOnLoginService).toHaveBeenCalled();
  });

  it('should abort logout', () => {
    const spyOnLoginService = spyOn(TestBed.get(LoginService), 'logout').and.callFake(() => {});
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(false));
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.onLogoutClick();
    expect(spyOnLoginService).not.toHaveBeenCalled();
  });

  it('should set the notifications', () => {
    const spyOnSnackbar = spyOn(TestBed.get(SnackbarService), 'show').and.callFake(() => {});
    const mockInfo: User = {email: '', id: 1, name: '', notificationsEnabled: true, surname: '', username: ''};
    spyOn(TestBed.get(UserService), 'setNotifications').and.returnValue(of(mockInfo));
    component.onToggleChange({checked: true, source: undefined});
    expect(spyOnSnackbar).toHaveBeenCalled();
    expect(component.isUpdatingSettings).toBe(false);
  });

  it('should update the avatar', async(() => {
    (TestBed.get(AvatarService) as AvatarService).avatarChanged$ = of('avatar');
    component.ngOnInit();
    component.avatar$.subscribe(value => expect(value).toBe('avatar'));
  }));


});
