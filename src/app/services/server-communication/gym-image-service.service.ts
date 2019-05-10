import {Injectable} from '@angular/core';
import {UrlService} from '../url.service';
import {HttpClient} from '@angular/common/http';
import {Gym} from 'src/app/model/entities/gym';
import {Observable} from 'rxjs';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';
import {CONSTANTS} from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class GymImageServiceService {

  constructor(private http: HttpClient, private urlService: UrlService) {
  }

  getPhotoOfGym(id: string): Observable<ArrayBuffer> {
    console.log(`Get photo ${id}`);
    const url = this.urlService.getRestUrl(`${CONSTANTS.GYMS}/photos/${id}`);
    return this.http.get<ArrayBuffer>(url, this.urlService.authenticationHeaderForImages);
  }

  getPhotoMetadataOfGym(gym: Gym): Observable<ImageMetadata[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.GYMS}/${gym.id}/photos`);
    return this.http.get<ImageMetadata[]>(url, this.urlService.authenticationHeader);
  }
}
