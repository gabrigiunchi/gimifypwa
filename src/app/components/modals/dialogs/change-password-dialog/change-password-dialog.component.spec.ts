import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChangePasswordDialogComponent} from './change-password-dialog.component';
import {MockDialog} from 'src/app/test-constants';
import {MatDialogRef, MatInputModule, MatProgressSpinnerModule, MatIconModule, MatDialogModule, MatDialog} from '@angular/material';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';
import {UserService} from 'src/app/services/server-communication/user.service';
import {throwError, of} from 'rxjs';

describe('ChangePasswordDialogComponent', () => {
  let component: ChangePasswordDialogComponent;
  let fixture: ComponentFixture<ChangePasswordDialogComponent>;
  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordDialogComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the form should be valid if the old password is present and the two new passwords are equal', () => {
    component.oldPasswordControl.patchValue('abcd');
    component.newPasswordControl.patchValue('aaaa');
    component.newPasswordRepeatControl.patchValue('aaaa');
    expect(component.form.valid).toBe(true);
  });

  it('the form should not be valid if the two new passwords are not equal', () => {
    component.oldPasswordControl.patchValue('abcd');
    component.newPasswordControl.patchValue('aaaa');
    component.newPasswordRepeatControl.patchValue('dasads');
    expect(component.form.valid).toBe(false);
  });

  it('the form should not be valid if the old password is not present', () => {
    component.oldPasswordControl.patchValue('');
    component.newPasswordControl.patchValue('aaaa');
    component.newPasswordRepeatControl.patchValue('aaaa');
    expect(component.form.valid).toBe(false);
  });

  it('should close', () => {
    const spyOnClose = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.close();
    expect(spyOnClose).toHaveBeenCalledWith(false);
  });

  it('should close if the password has been changed successfully', () => {
    const spyOnClose = spyOn(dialogRef, 'close').and.callFake(() => {});
    const spyOnDialog = spyOn(TestBed.get(MatDialog), 'open').and.callFake(() => {});
    spyOn(TestBed.get(UserService), 'changePassword').and.returnValue(of({}));
    component.submit();
    expect(spyOnClose).toHaveBeenCalledWith(true);
    expect(spyOnDialog).not.toHaveBeenCalled();
  });

  it('should open an error dialog if something goes wrong', () => {
    const spyOnDialog = spyOn(TestBed.get(MatDialog), 'open').and.callFake(() => {});
    spyOn(TestBed.get(UserService), 'changePassword').and.returnValue(throwError('error'));
    component.submit();
    expect(spyOnDialog).toHaveBeenCalledWith(ErrorDialogComponent, {autoFocus: false, restoreFocus: false, data: 'error'});
  });
});
