import {Injectable} from '@angular/core';
import {City} from '../model/entities/city';
import {LocalStorageKey} from '../model/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  set defaultCity(city: City) {
    localStorage.setItem(LocalStorageKey.defaultCity, JSON.stringify(city));
  }

  get defaultCity(): City {
    const item = localStorage.getItem(LocalStorageKey.defaultCity);
    return item == null ? undefined : JSON.parse(item);
  }
}
