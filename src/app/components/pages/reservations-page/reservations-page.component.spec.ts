import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReservationsPageComponent} from './reservations-page.component';
import {RouterModule} from '@angular/router';
import {MatIconModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CacheService} from 'src/app/services/cache.service';
import {Reservation} from 'src/app/model/entities/reservation';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {of} from 'rxjs';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {ReservationListComponent} from '../../layout/reservation-list/reservation-list.component';
import {TimePipe} from 'src/app/pipes/date/time.pipe';
import {ReservationsByDayPipe} from 'src/app/pipes/reservations-by-day.pipe';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {TestConstants} from 'src/app/test-constants';
import {MessageComponent} from '../../layout/message/message.component';

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
        ReservationListComponent,
        DateTimePipe,
        TimePipe,
        ReservationsByDayPipe,
        MessageComponent
      ],
      imports: [
        ScrollingModule,
        MatIconModule,
        MatListModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        MatProgressSpinnerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spy = spyOnProperty(TestBed.get(ReservationService), 'myFutureReservations', 'get').and.returnValue(of(mockReservations));
    fixture = TestBed.createComponent(ReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save the reservations in cache if one of them is selected', () => {
    const cacheService: CacheService<Reservation[]> = TestBed.get(CacheService);
    cacheService.clear();
    component.reservations = mockReservations;

    component.onReservationClick();

    expect(cacheService.element).toBeTruthy();
    expect(cacheService.element.length).toBe(1);
    expect(cacheService.element[0].id).toBe(6);
  });

  it('should load the reservations from cache if present', () => {
    expect(spy).toHaveBeenCalledTimes(1);
    const cacheService: CacheService<Reservation[]> = TestBed.get(CacheService);
    cacheService.element = mockReservations;
    component.ngOnInit();
    expect(spy).not.toHaveBeenCalledTimes(2);
  });

  it('should load the reservations from server if the cache does not contain anything', () => {
    expect(spy).toHaveBeenCalledTimes(1);
    const cacheService: CacheService<Reservation[]> = TestBed.get(CacheService);
    cacheService.clear();
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should clear the cache', () => {
    const cacheService: CacheService<Reservation[]> = TestBed.get(CacheService);
    const spyOnCache = spyOn(cacheService, 'clear').and.callThrough();
    component.ngOnDestroy();
    expect(spyOnCache).toHaveBeenCalled();
    expect(cacheService.isPresent).toBe(false);
  });

  it('should not clear the cache if a reservation is selected', () => {
    const cacheService: CacheService<Reservation[]> = TestBed.get(CacheService);
    const spyOnCache = spyOn(cacheService, 'clear').and.callThrough();
    component.onReservationClick();
    component.ngOnDestroy();
    expect(spyOnCache).not.toHaveBeenCalled();
    expect(cacheService.isPresent).toBe(true);
  });
});
