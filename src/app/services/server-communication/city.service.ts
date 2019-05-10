import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';
import {Observable} from 'rxjs';
import {City} from 'src/app/model/entities/city';
import {CONSTANTS} from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient, private urlService: UrlService) {
  }

  get cities(): Observable<City[]> {
    return this.http.get<City[]>(this.urlService.getRestUrl(CONSTANTS.CITIES), this.urlService.authenticationHeader);
  }
}
