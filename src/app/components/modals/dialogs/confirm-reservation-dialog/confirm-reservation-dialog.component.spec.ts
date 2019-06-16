import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmReservationDialogComponent, ConfirmReservationDialogData} from './confirm-reservation-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatIconModule, MatDialog} from '@angular/material';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {TestConstants, MockDialog} from 'src/app/test-constants';

describe('ConfirmReservationDialogComponent', () => {
  let component: ConfirmReservationDialogComponent;
  let fixture: ComponentFixture<ConfirmReservationDialogComponent>;

  const mockDialogData: ConfirmReservationDialogData = {
    asset: TestConstants.mockAsset,
    date: '2019-05-03',
    from: '10:00',
    to: '10:20'
  };

  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmReservationDialogComponent, DateTimePipe],
      imports: [
        MatIconModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData}
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel', () => {
    const spyOnDialog = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.dismiss();
    expect(spyOnDialog).toHaveBeenCalledWith(false);
  });

  it('should confirm', () => {
    const spyOnDialog = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.onConfirm();
    expect(spyOnDialog).toHaveBeenCalledWith(true);
  });
});
