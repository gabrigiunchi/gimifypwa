import {Injectable} from '@angular/core';
import {UrlService} from '../url.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CONSTANTS} from 'src/app/constants';
import {User} from 'src/app/model/entities/user';
import {City} from 'src/app/model/entities/city';
import {SessionService} from '../session.service';
import {LocalStorageKey} from 'src/app/model/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private sessionService: SessionService,
    private http: HttpClient,
    private urlService: UrlService) {
  }


  get userInfo(): Observable<User> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.USERS_URL}/me`);
    return this.http.get<User>(url, this.urlService.authenticationHeader);
  }

  setNotifications(enabled: boolean): Observable<{}> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.USERS_URL}/me/notifications/active/${enabled}`);
    return this.http.patch<{}>(url, this.urlService.authenticationHeader);
  }

  set defaultCity(city: City) {
    localStorage.setItem(LocalStorageKey.defaultCity, JSON.stringify(city));
  }

  get defaultCity(): City {
    const item = localStorage.getItem(LocalStorageKey.defaultCity);
    return item == null ? undefined : JSON.parse(item);
  }
}
