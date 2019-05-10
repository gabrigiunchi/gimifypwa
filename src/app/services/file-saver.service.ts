import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../model/local-storage-key';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class FileSaverService {

  constructor() {}

  /**
   * Encode a file in base64 and save it in the local storage
   */
  saveFile(key: LocalStorageKey, file: ArrayBuffer | Blob, type: string): Observable<string> {
    const subject = new Subject<string>();
    const result$ = subject.asObservable();
    const blob = new Blob([file], {type: type});
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result.toString();
      localStorage.setItem(key, base64data);
      subject.next(base64data);
    };
    reader.readAsDataURL(blob);
    return result$;
  }

  /**
   * Encode an image in base64 and save it in the local storage
   */
  saveImage(key: LocalStorageKey, file: ArrayBuffer | Blob): Observable<string> {
    return this.saveFile(key, file, 'image');
  }

  loadFile(key: LocalStorageKey): string {
    return localStorage.getItem(key);
  }
}
