import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReservationListComponent} from './reservation-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatIconModule, MatListModule} from '@angular/material';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {ReservationsByDayPipe} from 'src/app/pipes/reservations-by-day.pipe';
import {RouterModule} from '@angular/router';
import {ReservationTimePipe} from 'src/app/pipes/date/reservation-time.pipe';

describe('ReservationListComponent', () => {
  let component: ReservationListComponent;
  let fixture: ComponentFixture<ReservationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReservationListComponent,
        DateTimePipe,
        ReservationTimePipe,
        ReservationsByDayPipe
      ],
      imports: [
        ScrollingModule,
        MatListModule,
        MatIconModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
