import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReservationsPageComponent} from './reservations-page.component';
import {RouterModule} from '@angular/router';
import {MatIconModule, MatListModule, MatProgressSpinnerModule, MatToolbarModule, NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {Reservation} from 'src/app/model/entities/reservation';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {of} from 'rxjs';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {ReservationListComponent} from '../../layout/reservation-list/reservation-list.component';
import {ReservationsByDayPipe} from 'src/app/pipes/reservations-by-day.pipe';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {TestConstants} from 'src/app/test-constants';
import {MessageComponent} from '../../layout/message/message.component';
import {ReservationTimePipe} from 'src/app/pipes/date/reservation-time.pipe';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {GymAvatarPipe} from 'src/app/pipes/gym-avatar.pipe';
import {AvatarModule} from 'ngx-avatar';
import {GymImageService} from 'src/app/services/server-communication/gym-image-service';

describe('ReservationsPageComponent', () => {
  let component: ReservationsPageComponent;
  let fixture: ComponentFixture<ReservationsPageComponent>;

  const mockReservations: Reservation[] = [
    {
      asset: TestConstants.mockAsset,
      end: '2019-05-02T10:00:00+0200',
      start: '2019-05-02T11:00:00+0200',
      id: 6,
      user: TestConstants.mockUser
    }
  ];

  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReservationsPageComponent,
        LoadingComponent,
        ToolbarComponent,
        ReservationListComponent,
        DateTimePipe,
        ReservationTimePipe,
        ReservationsByDayPipe,
        MessageComponent,
        SafeUrlPipe,
        GymAvatarPipe,
      ],
      imports: [
        ScrollingModule,
        MatIconModule,
        AvatarModule,
        MatToolbarModule,
        MatListModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        MatProgressSpinnerModule,
        NativeDateModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(GymImageService), 'getAvatarMetadataOfGym').and.returnValue(of([]));
    spyOn(TestBed.get(GymImageService), 'getPhotoOfGym').and.returnValue(of(''));
    spy = spyOnProperty(TestBed.get(ReservationService), 'myFutureReservations', 'get').and.returnValue(of(mockReservations));
    fixture = TestBed.createComponent(ReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
