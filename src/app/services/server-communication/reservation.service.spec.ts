import {TestBed} from '@angular/core/testing';
import {ReservationSearchParams, ReservationService} from './reservation.service';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {MatNativeDateModule} from '@angular/material';

describe('ReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, MatNativeDateModule]
  }));

  let params: ReservationSearchParams;

  beforeEach(() => {
    params = {
      date: '2019-05-04',
      startHour: '10:00',
      endHour: '10:20',
      kind: {id: 1, name: 'PRESSA', maxReservationTime: 20},
      location: {city: {id: 1, name: 'MILANO'}, gym: undefined}
    };
  });

  it('should be created', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    expect(service).toBeTruthy();
  });

  it('should search assets based on parameters', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    const spy = spyOn(service, 'getAvailableAssets').and.returnValue(of([]));
    params.location = undefined;
    service.searchAssets(params);
    expect(spy).toHaveBeenCalledWith(params.kind, '2019-05-04T10:00:00+0200', '2019-05-04T10:20:00+0200');

    params.location = {city: undefined, gym: undefined};
    service.searchAssets(params);
    expect(spy).toHaveBeenCalledWith(params.kind, '2019-05-04T10:00:00+0200', '2019-05-04T10:20:00+0200');

  });

  it('should search assets in a city based on parameters', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    const spy = spyOn(service, 'getAvailableAssetsInCity').and.returnValue(of([]));
    service.searchAssets(params);
    expect(spy).toHaveBeenCalledWith(params.kind.id, params.location.city.id, '2019-05-04T10:00:00+0200', '2019-05-04T10:20:00+0200');
  });

  it('should search assets in a gym based on parameters', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    const spy = spyOn(service, 'getAvailableAssetsInGym').and.returnValue(of([]));
    params.location.gym = {id: 1, name: '', address: '', zoneId: '', city: params.location.city, latitude: 45.0, longitude: 10.0};
    service.searchAssets(params);
    expect(spy).toHaveBeenCalledWith(params.kind.id, params.location.gym.id, '2019-05-04T10:00:00+0200', '2019-05-04T10:20:00+0200');
  });
});
