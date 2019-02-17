import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UrlService} from '../url.service';
import {HttpClient} from '@angular/common/http';
import {CONSTANTS} from 'src/app/constants';

export interface AliveApiResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AliveService {

  constructor(private urlService: UrlService, private http: HttpClient) { }

  check(): Observable<AliveApiResponse> {
    return this.http.get<AliveApiResponse>(this.urlService.getRestUrl(CONSTANTS.ALIVE_URL));
  }
}
