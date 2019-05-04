import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';
import {Observable} from 'rxjs';
import {Reservation} from 'src/app/model/entities/reservation';
import {CONSTANTS} from 'src/app/constants';
import {ReservationDTO} from 'src/app/model/dto/reservationDTO';
import {Asset} from 'src/app/model/entities/asset';
import {AssetKind} from 'src/app/model/entities/asset-kind';
import {Gym} from 'src/app/model/entities/gym';
import {City} from 'src/app/model/entities/city';
import {DateService} from '../utils/date.service';
import {Page} from 'src/app/model/page';
import {SelectLocationResult} from 'src/app/components/modals/dialogs/select-location/select-location.component';

export interface ReservationSearchParams {
  location: SelectLocationResult;
  date: string;
  startHour: string;
  endHour: string;
  kind: AssetKind;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private dateService: DateService,
    private http: HttpClient,
    private urlService: UrlService) {
  }

  getAllMyReservations(page: number, size: number): Observable<Page<Reservation>> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.MY_RESERVATIONS}/page/${page}/size/${size}`);
    return this.http.get<Page<Reservation>>(url, this.urlService.authenticationHeader);
  }

  get myFutureReservations(): Observable<Reservation[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.MY_RESERVATIONS}/future`);
    return this.http.get<Reservation[]>(url, this.urlService.authenticationHeader);
  }

  getMyReservationById(id: number): Observable<Reservation> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.MY_RESERVATIONS}/${id}`);
    return this.http.get<Reservation>(url, this.urlService.authenticationHeader);
  }

  addReservation(
    assetId: number,
    date: string,
    startHour: string,
    endHour: string): Observable<Reservation> {

    const reservationDTO: ReservationDTO = {
      userID: -1,
      assetID: assetId,
      start: this.dateService.build(date, startHour),
      end: this.dateService.build(date, endHour),
    };

    return this.http.post<Reservation>(
      this.urlService.getRestUrl(CONSTANTS.MY_RESERVATIONS),
      reservationDTO,
      this.urlService.authenticationHeader);
  }

  deleteMyReservation(reservation: Reservation): Observable<{}> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.MY_RESERVATIONS}/${reservation.id}`);
    return this.http.delete(url, this.urlService.authenticationHeader);
  }

  getReservationsOfAssetOfToday(asset: Asset): Observable<Reservation[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.MY_RESERVATIONS}/of_asset/${asset.id}/today`);
    return this.http.get<Reservation[]>(url, this.urlService.authenticationHeader);
  }

  /**************************************** ASSET AVAILABILITY **************************************************************/

  searchAssets(params: ReservationSearchParams): Observable<Asset[]> {
    const kind = params.kind;
    const from = this.dateService.build(params.date, params.startHour);
    const to = this.dateService.build(params.date, params.endHour);

    if (params.location && params.location.gym) {
      return this.getAvailableAssetsInGym(kind, params.location.gym, from, to);
    } else if (params.location && params.location.city) {
      return this.getAvailableAssetsInCity(kind, params.location.city, from, to);
    }

    return this.getAvailableAssets(kind, from, to);
  }

  getAvailableAssets(kind: AssetKind, from: string, to: string): Observable<Asset[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.RESERVATIONS}/available/kind/${kind.id}/from/${from}/to/${to}`);
    return this.http.get<Asset[]>(url, this.urlService.authenticationHeader);
  }

  getAvailableAssetsInGym(kind: AssetKind, gym: Gym, from: string, to: string): Observable<Asset[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.RESERVATIONS}/available/kind/${kind.id}/from/${from}/to/${to}/gym/${gym.id}`);
    return this.http.get<Asset[]>(url, this.urlService.authenticationHeader);
  }

  getAvailableAssetsInCity(kind: AssetKind, city: City, from: string, to: string): Observable<Asset[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.RESERVATIONS}/available/kind/${kind.id}/from/${from}/to/${to}/city/${city.id}`);
    return this.http.get<Asset[]>(url, this.urlService.authenticationHeader);
  }

  isAssetAvailable(asset: Asset, from: string, to: string): Observable<boolean> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.RESERVATIONS}/available/asset/${asset.id}/from/${from}/to/${to}`);
    return this.http.get<boolean>(url, this.urlService.authenticationHeader);
  }

}

