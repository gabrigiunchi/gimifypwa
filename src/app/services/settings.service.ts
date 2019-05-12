import {Injectable} from '@angular/core';
import {City} from '../model/entities/city';
import {LocalStorageKey} from '../model/local-storage-key';
import {Gym} from '../model/entities/gym';
import {Subject} from 'rxjs';

export enum SettingsEvent {
  favoriteCitySet,
  favoriteGymSet
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private subject = new Subject<SettingsEvent>();
  events$ = this.subject.asObservable();

  set defaultCity(city: City) {
    this.subject.next(SettingsEvent.favoriteCitySet);
    localStorage.setItem(LocalStorageKey.defaultCity, JSON.stringify(city));
  }

  get defaultCity(): City {
    const item = localStorage.getItem(LocalStorageKey.defaultCity);
    return item == null ? undefined : JSON.parse(item);
  }

  set defaultGym(gym: Gym) {
    this.subject.next(SettingsEvent.favoriteGymSet);
    localStorage.setItem(LocalStorageKey.defaultGym, JSON.stringify(gym));
  }

  get defaultGym(): Gym {
    const item = localStorage.getItem(LocalStorageKey.defaultGym);
    return item == null ? undefined : JSON.parse(item);
  }
}
