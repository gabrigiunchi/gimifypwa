import { Injectable } from '@angular/core';
import {UrlService} from '../url.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CONSTANTS} from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService) { }

  getUsers(): Observable<any> {
    const url = this.urlService.getRestUrl(CONSTANTS.USERS_URL);
    return this.http.get(url, this.urlService.authenticationHeader);
  }
}
