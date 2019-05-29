import {Injectable} from '@angular/core';
import {UrlService} from '../url.service';
import {HttpClient} from '@angular/common/http';
import {Gym} from 'src/app/model/entities/gym';
import {Observable} from 'rxjs';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';
import {CONSTANTS} from 'src/app/constants';
import {FileSaverService} from '../file-saver.service';
import {SessionService} from '../session.service';
import {ImageService} from './image.service';

@Injectable({
  providedIn: 'root'
})
export class GymImageService extends ImageService {

  constructor(
    http: HttpClient,
    sessionService: SessionService,
    fileSaverService: FileSaverService,
    urlService: UrlService) {

      super(sessionService, urlService, fileSaverService, http);
  }

  getPhotoOfGym(metadata: ImageMetadata): Observable<string> {
    return super.getPhoto(metadata, this.urlService.getRestUrl(`${CONSTANTS.GYMS}/photos/${metadata.id}`));
  }

  getPhotoMetadataOfGym(gym: Gym): Observable<ImageMetadata[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.GYMS}/${gym.id}/photos`);
    return this.http.get<ImageMetadata[]>(url, this.urlService.authenticationHeader);
  }

  getAvatarMetadataOfGym(gym: Gym): Observable<ImageMetadata> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.GYMS}/${gym.id}/avatar/metadata`);
    return this.http.get<ImageMetadata>(url, this.urlService.authenticationHeader);
  }

}
