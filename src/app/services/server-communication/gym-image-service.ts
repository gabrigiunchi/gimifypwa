import {Injectable} from '@angular/core';
import {UrlService} from '../url.service';
import {HttpClient} from '@angular/common/http';
import {Gym} from 'src/app/model/entities/gym';
import {Observable, of} from 'rxjs';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';
import {CONSTANTS} from 'src/app/constants';
import {FileSaverService} from '../file-saver.service';
import {SessionService} from '../session.service';
import {map, tap} from 'rxjs/operators';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';

@Injectable({
  providedIn: 'root'
})
export class GymImageService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private fileSaverService: FileSaverService,
    private urlService: UrlService) {
  }

  getPhotoOfGym(metadata: ImageMetadata): Observable<string> {
    if (this.metadataAreUpdated(metadata)) {
      console.log(`Found image ${metadata.id} in cache`);
      return of(this.fileSaverService.loadFile(metadata.id));
    }

    const url = this.urlService.getRestUrl(`${CONSTANTS.GYMS}/photos/${metadata.id}`);
    return this.http.get<ArrayBuffer>(url, this.urlService.authenticationHeaderForImages)
      .pipe(
        tap(binary => {
          console.log(`Saving image ${metadata.id}`);
          this.fileSaverService.saveImage(metadata.id, binary);
          this.sessionService.saveMetadata(metadata);
        }),
        map(binary => new DataUrlPipe().transform(binary)));
  }

  getPhotoMetadataOfGym(gym: Gym): Observable<ImageMetadata[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.GYMS}/${gym.id}/photos`);
    return this.http.get<ImageMetadata[]>(url, this.urlService.authenticationHeader);
  }

  private metadataAreUpdated(metadata: ImageMetadata): boolean {
    const savedMetadata = this.sessionService.getMetadata(metadata.id);
    return !!(savedMetadata && savedMetadata.lastModified === metadata.lastModified);
  }
}
