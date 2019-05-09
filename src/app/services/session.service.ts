import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../model/local-storage-key';
import {User} from '../model/entities/user';

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
