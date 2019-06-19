import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultListComponent} from './result-list.component';
import {ResultListItemComponent} from './result-list-item/result-list-item.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCardModule, MatDialog, MatDialogModule, MatIconModule, MatProgressSpinnerModule, NativeDateModule} from '@angular/material';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {MessageComponent} from 'src/app/components/layout/message/message.component';
import {Router, RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AvatarModule} from 'ngx-avatar';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {GymAvatarPipe} from 'src/app/pipes/gym-avatar.pipe';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {TimePipe} from 'src/app/pipes/date/time.pipe';
import {of} from 'rxjs';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {MockDialog, TestConstants} from 'src/app/test-constants';

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultListComponent,
        ResultListItemComponent,
        LoadingComponent,
        MessageComponent,
        SafeUrlPipe,
        GymAvatarPipe,
        DateTimePipe,
        TimePipe,
      ],
      imports: [
        ScrollingModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDialogModule,
        AvatarModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        NativeDateModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a reservation', () => {
    const spyOnRouter = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    spyOn(TestBed.get(ReservationService), 'addReservation').and.returnValue(of({}));

    // Mock dialog
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(true));
    spyOn(dialog, 'open').and.returnValue(dialogRef);


    component.onBookingClick(TestConstants.mockAsset);
    expect(spyOnRouter).toHaveBeenCalledWith(['/reservations']);
  });

  it('should not confirm the reservation', () => {
    const spyOnRouter = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    const spyOnAdd = spyOn(TestBed.get(ReservationService), 'addReservation').and.returnValue(of({}));

    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(false));
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.onBookingClick(TestConstants.mockAsset);
    expect(spyOnRouter).not.toHaveBeenCalled();
    expect(spyOnAdd).not.toHaveBeenCalled();
  });
});
