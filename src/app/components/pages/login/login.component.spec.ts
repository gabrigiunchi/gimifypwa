import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialog, MatDialogModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {Router, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginService} from 'src/app/services/server-communication/login.service';
import {of, throwError} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';
import {ErrorDialogComponent} from '../../modals/dialogs/error-dialog/error-dialog.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, ToolbarComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatIconModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        MatDialogModule,
        MatToolbarModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    const spy = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    spyOn(TestBed.get(LoginService), 'login').and.returnValue(of(true));
    component.login();
    expect(spy).toHaveBeenCalledWith([CONSTANTS.HOMEPAGE]);
  });

  it('should login and redirect', () => {
    const loginService: LoginService = TestBed.get(LoginService);
    loginService.redirectUrl = '/page';
    const spy = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    spyOn(loginService, 'login').and.returnValue(of(true));
    component.login();
    expect(spy).toHaveBeenCalledWith(['/page']);
  });

  it('should fail login', () => {
    const loginService: LoginService = TestBed.get(LoginService);
    loginService.redirectUrl = '/page';
    const spy = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    spyOn(loginService, 'login').and.returnValue(of(false));
    component.login();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should show an error message if the login fails', () => {
    const spyOnDialog = spyOn(TestBed.get(MatDialog), 'open').and.callFake(() => {});
    spyOn(TestBed.get(LoginService), 'login').and.returnValue(throwError('login error'));
    component.login();
    expect(spyOnDialog).toHaveBeenCalledWith(ErrorDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: 'Username and/or password incorrect'
    });
  });
});
