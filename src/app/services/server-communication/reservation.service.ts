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

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, private urlService: UrlService) {}

  get myFutureReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.urlService.getRestUrl(CONSTANTS.MY_RESERVATIONS), this.urlService.authenticationHeader);
  }

  getMyFutureReservationById(id: number): Observable<Reservation> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.MY_RESERVATIONS}/${id}`);
    return this.http.get<Reservation>(url, this.urlService.authenticationHeader);
  }

  addReservation(reservationDTO: ReservationDTO): Observable<Reservation> {
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

  getAvailableAssets(kind: AssetKind, from: string, to: string): Observable<Asset[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.MY_RESERVATIONS}/available/kind/${kind.id}/from/${from}/to/${to}`);
    return this.http.get<Asset[]>(url, this.urlService.authenticationHeader);
  }

  getAvailableAssetsInGym(kind: AssetKind, gym: Gym, from: string, to: string): Observable<Asset[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.MY_RESERVATIONS}/available/kind/${kind.id}/from/${from}/to/${to}/gym/${gym.id}`);
    return this.http.get<Asset[]>(url, this.urlService.authenticationHeader);
  }

  getAvailableAssetsInCity(kind: AssetKind, city: City, from: string, to: string): Observable<Asset[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.MY_RESERVATIONS}/available/kind/${kind.id}/from/${from}/to/${to}/city/${city.id}`);
    return this.http.get<Asset[]>(url, this.urlService.authenticationHeader);
  }

}

