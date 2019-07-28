import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatToolbarModule,
  NativeDateModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {WaitingPageComponent} from './components/pages/waiting-page/waiting-page.component';
import {LoginComponent} from './components/pages/login/login.component';
import {ProfilePageComponent} from './components/pages/profile-page/profile-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToolbarComponent} from './components/layout/toolbar/toolbar.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {AvatarComponent} from './components/layout/avatar/avatar.component';
import {SafeUrlPipe} from './pipes/safe-url.pipe';
import {LoadingComponent} from './components/layout/loading/loading.component';
import {FooterSectionColorPipe} from './pipes/footer-section-color.pipe';
import {DefaultCityPickerComponent} from './components/input/default-city-picker/default-city-picker.component';
import {DefaultGymPickerComponent} from './components/input/default-gym-picker/default-gym-picker.component';
import {AvatarModule} from 'ngx-avatar';
import {ChangePasswordComponent} from './components/input/change-password/change-password.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        WaitingPageComponent,
        LoginComponent,
        ProfilePageComponent,
        ToolbarComponent,
        FooterComponent,
        AvatarComponent,
        SafeUrlPipe,
        LoadingComponent,
        FooterSectionColorPipe,
        DefaultCityPickerComponent,
        DefaultGymPickerComponent,
        ChangePasswordComponent
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        AvatarModule,
        HttpClientModule,
        MatDividerModule,
        ScrollingModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatInputModule,
        NativeDateModule
      ],

    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
