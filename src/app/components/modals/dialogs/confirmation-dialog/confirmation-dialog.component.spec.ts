import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationDialogComponent, ConfirmationDialogData} from './confirmation-dialog.component';
import {MAT_DIALOG_DATA, MatButtonModule, MatDialogRef, NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MockDialog} from 'src/app/test-constants';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [
        MatButtonModule,
        NativeDateModule,
        HttpClientModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
        {provide: MAT_DIALOG_DATA, useValue: undefined}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel', () => {
    const spyOnDialog = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.cancel();
    expect(spyOnDialog).toHaveBeenCalledWith(false);
  });

  it('should confirm', () => {
    const spyOnDialog = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.confirm();
    expect(spyOnDialog).toHaveBeenCalledWith(true);
  });
});
