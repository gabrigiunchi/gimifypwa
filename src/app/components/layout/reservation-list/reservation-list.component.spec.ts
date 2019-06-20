import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReservationListComponent} from './reservation-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatIconModule, MatListModule} from '@angular/material';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {ReservationsByDayPipe} from 'src/app/pipes/reservations-by-day.pipe';
import {RouterModule} from '@angular/router';
import {ReservationTimePipe} from 'src/app/pipes/date/reservation-time.pipe';
import {AvatarModule} from 'ngx-avatar';
import {GymAvatarPipe} from 'src/app/pipes/gym-avatar.pipe';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GymImageService} from 'src/app/services/server-communication/gym-image-service';
import {of} from 'rxjs';

describe('ReservationListComponent', () => {
  let component: ReservationListComponent;
  let fixture: ComponentFixture<ReservationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReservationListComponent,
        DateTimePipe,
        ReservationTimePipe,
        ReservationsByDayPipe,
        GymAvatarPipe,
        SafeUrlPipe
      ],
      imports: [
        ScrollingModule,
        MatListModule,
        HttpClientTestingModule,
        MatIconModule,
        AvatarModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(GymImageService), 'getAvatarMetadataOfGym').and.returnValue(of([]));
    spyOn(TestBed.get(GymImageService), 'getPhotoOfGym').and.returnValue(of(''));
    fixture = TestBed.createComponent(ReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
