import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';
import {Observable} from 'rxjs';
import {Gym} from 'src/app/model/entities/gym';
import {CONSTANTS} from 'src/app/constants';
import {City} from 'src/app/model/entities/city';
import {CacheService} from '../cache.service';
import {FilterResult} from 'src/app/model/filter-result';
import {GymFilterParams} from 'src/app/components/pages/gyms-page/gyms-page.component';
import {Page} from 'src/app/model/page';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GymService extends CacheService<FilterResult<Gym, GymFilterParams>> {

  constructor(private http: HttpClient, private urlService: UrlService) {
    super();
  }

  get gyms(): Observable<Gym[]> {
    return this.http.get<Page<Gym>>(
      this.urlService.getRestUrl(`${CONSTANTS.GYMS}/page/0/size/30`),
      this.urlService.authenticationHeader).pipe(map(page => page.content));
  }

  getGymById(id: number): Observable<Gym> {
    return this.http.get<Gym>(this.urlService.getRestUrl(`${CONSTANTS.GYMS}/${id}`), this.urlService.authenticationHeader);
  }

  getGymsByCity(city: City): Observable<Gym[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.GYMS}/city/${city.id}`);
    return this.http.get<Gym[]>(url, this.urlService.authenticationHeader);
  }

  getRatingOfGym(gymId: number): Observable<number> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.GYMS}/${gymId}/rating`);
    return this.http.get<number>(url, this.urlService.authenticationHeader);
  }
}
