import {Injectable} from '@angular/core';
import {UrlService} from '../url.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CONSTANTS} from 'src/app/constants';
import {User} from 'src/app/model/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService) {}


  get userInfo(): Observable<User> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.USERS_URL}/me`);
    return this.http.get<User>(url, this.urlService.authenticationHeader);
  }
}
