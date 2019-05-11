import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmReservationDialogComponent, ConfirmReservationDialogData} from './confirm-reservation-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatIconModule} from '@angular/material';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {TestConstants} from 'src/app/test-constants';

describe('ConfirmReservationDialogComponent', () => {
  let component: ConfirmReservationDialogComponent;
  let fixture: ComponentFixture<ConfirmReservationDialogComponent>;

  const mockDialogData: ConfirmReservationDialogData = {
    asset: TestConstants.mockAsset,
    date: '2019-05-03',
    from: '10:00',
    to: '10:20'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmReservationDialogComponent, DateTimePipe],
      imports: [
        MatIconModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
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
});
