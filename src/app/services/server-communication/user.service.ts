import {Injectable} from '@angular/core';
import {UrlService} from '../url.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CONSTANTS} from 'src/app/constants';
import {User} from 'src/app/model/entities/user';
import {SessionService} from '../session.service';
import {tap} from 'rxjs/operators';

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
    return this.http.get<User>(url, this.urlService.authenticationHeader)
      .pipe(tap((user: User) => this.sessionService.user = user));
  }

  isLoggedUser(userId: number): boolean {
    return !!(this.sessionService.user && this.sessionService.user.id === userId);
  }

  setNotifications(enabled: boolean): Observable<User> {
    return this.http.patch<User>(
      this.urlService.getRestUrl(`${CONSTANTS.USERS_URL}/me/notifications/active/${enabled}`),
      {},
      this.urlService.authenticationHeader);
  }
}
