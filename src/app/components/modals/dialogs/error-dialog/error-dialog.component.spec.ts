import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ErrorDialogComponent} from './error-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatIconModule} from '@angular/material';
import {MockDialog} from 'src/app/test-constants';
import {HttpErrorResponse} from '@angular/common/http';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;
  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDialogComponent],
      imports: [
        MatIconModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
        {provide: MAT_DIALOG_DATA, useValue: ''}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    const spyOnDialogRef = spyOn(dialogRef, 'close');
    component.dismiss();
    expect(spyOnDialogRef).toHaveBeenCalledWith();
  });

  it('should display an http error', () => {
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: [{message: 'error101'}],
      headers: undefined,
      status: 404,
      statusText: '',
      url: ''
    });
    component = new ErrorDialogComponent(undefined, error);
    expect(component.message).toBe('error101');
  });
});
