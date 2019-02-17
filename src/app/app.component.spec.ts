import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {MatIconModule, MatProgressSpinnerModule, MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HomepageComponent} from './components/pages/homepage/homepage.component';
import {WaitingPageComponent} from './components/pages/waiting-page/waiting-page.component';
import {LoginComponent} from './components/pages/login/login.component';
import {ProfilePageComponent} from './components/pages/profile-page/profile-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomepageComponent,
        WaitingPageComponent,
        LoginComponent,
        ProfilePageComponent,
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,

      ],

    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
