import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../model/local-storage-key';
import {User} from '../model/entities/user';
import {ImageMetadata} from '../model/entities/images-metadata';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  set token(token: string) {
    localStorage.setItem(LocalStorageKey.token, token);
  }

  get token(): string {
    return localStorage.getItem(LocalStorageKey.token);
  }

  set user(user: User) {
    console.log('Saving user\'s info in cache', user);
    localStorage.setItem(LocalStorageKey.user, JSON.stringify(user));
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(LocalStorageKey.user));
  }

  clear() {
    localStorage.clear();
  }

  saveMetadata(metadata: ImageMetadata) {
    localStorage.setItem(`metadata_${metadata.id}`, JSON.stringify(metadata));
  }

  getMetadata(metadataId: string): ImageMetadata {
    return JSON.parse(localStorage.getItem(`metadata_${metadataId}`));
  }
}
