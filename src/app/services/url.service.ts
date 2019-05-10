import {Injectable} from '@angular/core';
import {CONSTANTS} from '../constants';
import {SessionService} from './session.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private sessionService: SessionService) {
  }

  getRestUrl(suffix: string): string {
    return `${CONSTANTS.BASE_URL}${suffix}`;
  }

  get authenticationHeader(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.sessionService.token
      })
    };

    return httpOptions;
  }

  get token(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.sessionService.token
      })
    };

    return httpOptions;
  }

  get authenticationHeaderForImages(): { headers: HttpHeaders } {
    const httpOptions = {
      responseType: 'arraybuffer',
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.sessionService.token
      })
    };

    return httpOptions;
  }
}
