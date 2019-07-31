import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChangePasswordComponent} from './change-password.component';
import {MatDialog, MatDialogModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import {of} from 'rxjs';
import {MockDialog} from 'src/app/test-constants';
import {SnackbarService} from 'src/app/services/snackbar.service';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the password and show a message', () => {
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(true));
    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRef);
    const spyOnSnackbar = spyOn(TestBed.get(SnackbarService), 'show');
    component.changePassword();
    expect(spyOnSnackbar).toHaveBeenCalledWith('Password changed successfully');
  });

  it('should not change the password and show nothing', () => {
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(undefined));
    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRef);
    const spyOnSnackbar = spyOn(TestBed.get(SnackbarService), 'show');
    component.changePassword();
    expect(spyOnSnackbar).not.toHaveBeenCalled();
  });
});
