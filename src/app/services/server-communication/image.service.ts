import {Injectable} from '@angular/core';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';
import {Observable, of} from 'rxjs';
import {SessionService} from '../session.service';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';
import {FileSaverService} from '../file-saver.service';
import {map, tap} from 'rxjs/operators';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    protected sessionService: SessionService,
    protected urlService: UrlService,
    protected fileSaverService: FileSaverService,
    protected http: HttpClient) {}


  getPhoto(metadata: ImageMetadata, imageUrl: string): Observable<string> {
    if (this.metadataAreUpdated(metadata)) {
      console.log(`Found image ${metadata.id} in cache`);
      return of(this.fileSaverService.loadFile(metadata.id));
    }

    const url = this.urlService.getRestUrl(imageUrl);
    return this.http.get<ArrayBuffer>(url, this.urlService.authenticationHeaderForImages)
      .pipe(
        tap(binary => {
          console.log(`Saving image ${metadata.id}`);
          this.fileSaverService.saveImage(metadata.id, binary);
          this.sessionService.saveMetadata(metadata);
        }),
        map(binary => new DataUrlPipe().transform(binary)));
  }

  private metadataAreUpdated(metadata: ImageMetadata): boolean {
    const savedMetadata = this.sessionService.getMetadata(metadata.id);
    return !!(savedMetadata && savedMetadata.lastModified === metadata.lastModified);
  }
}
