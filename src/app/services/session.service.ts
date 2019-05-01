import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../model/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
  }

  set token(token: string) {
    localStorage.setItem(LocalStorageKey.token, token);
  }

  get token(): string {
    return localStorage.getItem(LocalStorageKey.token);
  }

  clear() {
    localStorage.clear();
  }
}
