import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../model/local-storage-key';
import {User} from '../model/entities/user';

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
}
