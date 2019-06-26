import {async, TestBed} from '@angular/core/testing';
import {ReservationSearchParams, ReservationService} from './reservation.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {MatNativeDateModule} from '@angular/material';
import {TestConstants} from 'src/app/test-constants';
import {Settings} from 'luxon';
import {UrlService} from '../url.service';
import {CONSTANTS} from 'src/app/constants';
import {ReservationDTO} from 'src/app/model/dto/reservationDTO';

describe('ReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, MatNativeDateModule]
  }));

  let params: ReservationSearchParams;
  let service: ReservationService;

  beforeEach(() => {
    service = TestBed.get(ReservationService);
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeader', 'get').and.returnValue({});
    Settings.defaultZoneName = 'Europe/Rome';
    params = {
      date: '2019-05-04',
      startHour: '10:00',
      endHour: '10:20',
      kind: {id: 1, name: 'PRESSA', maxReservationTime: 20},
      location: {city: TestConstants.mockCity, gym: undefined}
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search assets based on parameters', () => {
    const spy = spyOn(service, 'getAvailableAssets').and.returnValue(of([]));
    params.location = undefined;
    service.searchAssets(params);
    expect(spy).toHaveBeenCalledWith(params.kind.id, '2019-05-04T10:00:00+02:00', '2019-05-04T10:20:00+02:00');

    params.location = {city: undefined, gym: undefined};
    service.searchAssets(params);
    expect(spy).toHaveBeenCalledWith(params.kind.id, '2019-05-04T10:00:00+02:00', '2019-05-04T10:20:00+02:00');

  });

  it('should search assets in a city based on parameters', () => {
    const spy = spyOn(service, 'getAvailableAssetsInCity').and.returnValue(of([]));
    service.searchAssets(params);
    expect(spy).toHaveBeenCalledWith(params.kind.id, params.location.city.id, '2019-05-04T10:00:00+02:00', '2019-05-04T10:20:00+02:00');
  });

  it('should search assets in a gym based on parameters', () => {
    const spy = spyOn(service, 'getAvailableAssetsInGym').and.returnValue(of([]));
    params.location.gym = {id: 1, name: '', address: '', city: params.location.city, latitude: 45.0, longitude: 10.0};
    service.searchAssets(params);
    expect(spy).toHaveBeenCalledWith(params.kind.id, params.location.gym.id, '2019-05-04T10:00:00+02:00', '2019-05-04T10:20:00+02:00');
  });

  it('should get all my future reservations', async(() => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.mockReservations));
    service.myFutureReservations.subscribe(res => expect(res).toEqual(TestConstants.mockReservations));
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.RESERVATIONS}/me/future`, {});
  }));

  it('should one of my reservations by id', async(() => {
    const reservation = TestConstants.mockReservations[0];
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(reservation));
    service.getMyReservationById(reservation.id).subscribe(res => expect(res).toEqual(reservation));
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.MY_RESERVATIONS}/${reservation.id}`, {});
  }));

  it('should add a reservation', async(() => {
    Settings.defaultZoneName = 'UTC';
    const reservation = TestConstants.mockReservations[0];
    const dto: ReservationDTO = {
      assetID: TestConstants.mockAsset.id,
      start: '2019-06-23T10:00:00+00:00',
      end: '2019-06-23T12:00:00+00:00',
      userID: -1
    };
    const spy = spyOn(TestBed.get(HttpClient), 'post').and.returnValue(of(reservation));
    service.addReservation(TestConstants.mockAsset, '2019-06-23', '10:00', '12:00').subscribe(res => expect(res).toEqual(reservation));
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.MY_RESERVATIONS}`, dto, {});
  }));

  it('should delete a reservation', () => {
    const reservation = TestConstants.mockReservations[0];
    const spy = spyOn(TestBed.get(HttpClient), 'delete').and.returnValue(of({}));
    service.deleteMyReservation(reservation);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.MY_RESERVATIONS}/${reservation.id}`, {});
  });

  it('should return the number of reservations I made', async(() => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(1));
    service.myReservationsCount.subscribe(result => {
      expect(result).toBe(1);
      expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.MY_RESERVATIONS}/count`, {});
    });
  }));

  /********************************** ASSET AVAILABILITY ********************************************/

  it('should search free assets', async(() => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of([]));
    const start = '2019-10-10T10:00:00+00:00';
    const end = '2019-10-10T12:00:00+00:00';
    service.getAvailableAssets(1, start, end);
    expect(spy).toHaveBeenCalledWith(
      `${CONSTANTS.BASE_URL}${CONSTANTS.RESERVATIONS}/available/kind/1/from/${start}/to/${end}`, {});
  }));

  it('should search free assets in a city', async(() => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of([]));
    const start = '2019-10-10T10:00:00+00:00';
    const end = '2019-10-10T12:00:00+00:00';
    service.getAvailableAssetsInCity(1, 1, start, end);
    expect(spy).toHaveBeenCalledWith(
      `${CONSTANTS.BASE_URL}${CONSTANTS.RESERVATIONS}/available/kind/1/from/${start}/to/${end}/city/1`, {});
  }));

  it('should search free assets in a gym', async(() => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of([]));
    const start = '2019-10-10T10:00:00+00:00';
    const end = '2019-10-10T12:00:00+00:00';
    service.getAvailableAssetsInGym(1, 1, start, end);
    expect(spy).toHaveBeenCalledWith(
      `${CONSTANTS.BASE_URL}${CONSTANTS.RESERVATIONS}/available/kind/1/from/${start}/to/${end}/gym/1`, {});
  }));

});
