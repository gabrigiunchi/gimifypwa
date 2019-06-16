import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReservationDetailsComponent} from './reservation-details.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Router} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import {
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  NativeDateModule,
  MatDialog
} from '@angular/material';
import {ToolbarComponent} from 'src/app/components/layout/toolbar/toolbar.component';
import {MapComponent} from 'src/app/components/layout/map/map.component';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {ReservationTimePipe} from 'src/app/pipes/date/reservation-time.pipe';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {of} from 'rxjs';
import {Reservation} from 'src/app/model/entities/reservation';
import {TestConstants, MockDialog} from 'src/app/test-constants';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ReservationDetailsComponent', () => {
  let component: ReservationDetailsComponent;
  let fixture: ComponentFixture<ReservationDetailsComponent>;

  const mockReservation: Reservation = TestConstants.mockReservations[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReservationDetailsComponent,
        ToolbarComponent,
        MapComponent,
        ReservationTimePipe,
        DateTimePipe,
        LoadingComponent,
      ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBiClW-tzn_XUpFDNs6c5PjwGtE61xaW6A'
        }),
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatListModule,
        MatProgressSpinnerModule,
        NativeDateModule,
        BrowserAnimationsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(ReservationService), 'getMyReservationById').and.returnValue(of(mockReservation));
    fixture = TestBed.createComponent(ReservationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should say if it can be deleted or not', () => {
    mockReservation.start = '2050-01-01T10:00:00+0000';
    mockReservation.end = '2050-01-01T12:00:00+0000';
    expect(component.canDelete(mockReservation)).toBe(true);

    mockReservation.start = '2000-01-01T10:00:00+0000';
    mockReservation.end = '2000-01-01T12:00:00+0000';
    expect(component.canDelete(mockReservation)).toBe(false);
  });

  it('should delete a reservation', () => {
    const spyOnRouter = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    spyOn(TestBed.get(ReservationService), 'deleteMyReservation').and.returnValue(of({}));

    // Mock dialog
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(true));
    spyOn(dialog, 'open').and.returnValue(dialogRef);


    component.onDeleteClick(mockReservation);
    expect(spyOnRouter).toHaveBeenCalledWith(['/reservations']);
  });
});
