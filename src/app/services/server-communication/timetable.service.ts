import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';
import {Gym} from 'src/app/model/entities/gym';
import {Observable} from 'rxjs';
import {Timetable} from 'src/app/model/entities/timetable';
import {CONSTANTS} from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http: HttpClient, private urlService: UrlService) {}

  getTimetableOfGym(gym: Gym): Observable<Timetable> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.TIMETABLES}/by_gym/${gym.id}`);
    return this.http.get<Timetable>(url, this.urlService.authenticationHeader);
  }

}
