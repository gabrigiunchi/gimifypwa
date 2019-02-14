import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private urlService: UrlService,
    private http: HttpClient) { }

  greetings(): Observable<any> {
    return this.http.get<any>(this.urlService.getRestUrl(CONSTANTS.GREETINGS_URL));
  }
}
