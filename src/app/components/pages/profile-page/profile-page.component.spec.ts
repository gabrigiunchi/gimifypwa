import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfilePageComponent} from './profile-page.component';
import {HttpClientModule} from '@angular/common/http';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';
import {of} from 'rxjs';
import {AvatarComponent} from '../../layout/avatar/avatar.component';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {MatProgressSpinnerModule, MatSlideToggleModule, MatSnackBarModule} from '@angular/material';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {RouterModule} from '@angular/router';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfilePageComponent,
        AvatarComponent,
        SafeUrlPipe,
        LoadingComponent
      ],
      imports: [
        HttpClientModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const avatarService = TestBed.get(AvatarService);
    spyOnProperty(avatarService, 'myAvatar', 'get').and.returnValue(of(''));
    spyOn(avatarService, 'checkAvatar').and.callFake(() => {
    });
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
