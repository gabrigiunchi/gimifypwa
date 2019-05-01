import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  constructor(private http: HttpClient, private urlService: UrlService) {}


}
