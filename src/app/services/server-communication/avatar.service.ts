import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {map, tap} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {of} from 'rxjs/internal/observable/of';
import {LocalStorageKey} from 'src/app/model/local-storage-key';
import {FileSaverService} from '../file-saver.service';
import {UrlService} from '../url.service';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';
import {CONSTANTS} from 'src/app/constants';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  static readonly DEFAULT_AVATAR_METADATA: ImageMetadata = {
    id: 'default',
    lastModified: 0
  };

  private avatarSubject = new Subject<string>();
  avatarChanged$ = this.avatarSubject.asObservable();

  constructor(
    private fileSaver: FileSaverService,
    private http: HttpClient,
    private urlService: UrlService) {
  }

  /********************************* GENERAL *********************************************/

  download(endpoint: string): Observable<ArrayBuffer> {
    return this.http.get<ArrayBuffer>(endpoint, this.urlService.authenticationHeaderForImages);
  }

  downloadAvatar(id: string): Observable<ArrayBuffer> {
    return this.download(this.urlService.getRestUrl(`${CONSTANTS.AVATARS}/${id}`));
  }

  clearCache(): void {
    console.log('Clearing avatar cache...');
    localStorage.removeItem(LocalStorageKey.avatar);
    this.avatarMetadata = AvatarService.DEFAULT_AVATAR_METADATA;
  }

  get presetAvatarMetadata(): Observable<ImageMetadata[]> {
    return this.http.get<ImageMetadata[]>(
      this.urlService.getRestUrl(CONSTANTS.PRESET_AVATARS),
      this.urlService.authenticationHeader);
  }

  getMetadataOfUser(id: number): Observable<ImageMetadata> {
    return this.http.get<ImageMetadata>(
      this.urlService.getRestUrl(`${CONSTANTS.AVATARS}/metadata/of_user/${id}`), this.urlService.authenticationHeader);
  }

  downloadAvatarOfUser(id: number): Observable<ArrayBuffer> {
    console.log(`Get avatar of user #${id}`);
    return this.download(this.urlService.getRestUrl(`${CONSTANTS.AVATARS}/of_user/${id}`));
  }

  /******************************* MY AVATAR  *********************************************/
  checkAvatar(): void {
    console.log('Checking if the avatar is up to date');
    this.loadMyAvatarMetadata().subscribe(
      metadata => {
        console.log('Received avatar\'s metadata from server: ', metadata);
        const savedMetadata = this.avatarMetadata;

        if (!!(savedMetadata && savedMetadata.lastModified === metadata.lastModified)) {
          console.log('Avatar is up to date');
          this.avatarSubject.next(this.isDefaultAvatar ? undefined : this.cachedAvatar);
        } else {
          console.log('Avatar not found or not up to date');
          this.avatarMetadata = metadata;
          if (!this.isDefaultAvatar) {
            this.downloadMyAvatar().subscribe(result => this.avatarSubject.next(result));
          } else {
            this.avatarSubject.next(undefined);
          }
        }
      }
    );
  }

  downloadMyAvatar(): Observable<string> {
    const url = this.urlService.getRestUrl(CONSTANTS.MY_AVATAR);

    /**
     * Map the binary received from the server into a dataUrl so that the subscriber
     * doesn't have to deal with the binary format of the image
     */
    return this.download(url).pipe(map(binary => {
      console.log('Download of avatar completed, saving in cache...');
      this.fileSaver.saveImage(LocalStorageKey.avatar, binary);
      return new DataUrlPipe().transform(binary);
    }));
  }

  get myAvatar(): string {
    return this.cachedAvatar ? this.cachedAvatar : undefined;
  }

  get cachedAvatar(): string {
    return this.fileSaver.loadFile(LocalStorageKey.avatar);
  }

  changeAvatar(binary: ArrayBuffer | Blob): Observable<ImageMetadata> {
    console.log('Uploading the new avatar....');

    const file: Blob = binary instanceof (ArrayBuffer) ? new Blob([binary], {type: 'image'}) : binary;
    const formData = new FormData();
    formData.set('avatar', file);
    const url = this.urlService.getRestUrl(CONSTANTS.MY_AVATAR);

    return this.http.put<ImageMetadata>(url, formData, this.urlService.token)
      .pipe(tap(metadata => {
        console.log('Avatar uploaded');
        console.log('Received updated metadata: ', metadata);
        this.avatarMetadata = metadata;

        this.fileSaver.saveImage(LocalStorageKey.avatar, binary).subscribe(result => {
          this.avatarSubject.next(result);
        });
      }));
  }

  deleteAvatar(): Observable<{}> {
    console.log('Resetting the avatar....');
    this.clearCache();

    return this.http.delete(this.urlService.getRestUrl(CONSTANTS.MY_AVATAR), this.urlService.authenticationHeader)
      .pipe(tap(() => {
        console.log('Avatar reset, download the default one....');
        this.avatarSubject.next(undefined);
      }));
  }

  loadMyAvatarMetadata(): Observable<ImageMetadata> {
    return this.http.get<ImageMetadata>(
      this.urlService.getRestUrl(`${CONSTANTS.MY_AVATAR}/metadata`),
      this.urlService.authenticationHeader);
  }

  get avatarMetadata(): ImageMetadata {
    return JSON.parse(localStorage.getItem(LocalStorageKey.avatarMetadata));
  }

  set avatarMetadata(metadata: ImageMetadata) {
    localStorage.setItem(LocalStorageKey.avatarMetadata, JSON.stringify(metadata));
  }

  get isDefaultAvatar(): boolean {
    return this.avatarMetadata && this.avatarMetadata.id === AvatarService.DEFAULT_AVATAR_METADATA.id;
  }
}
