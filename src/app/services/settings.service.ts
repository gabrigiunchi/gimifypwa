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
    if (city === undefined || city == null) {
      localStorage.removeItem(LocalStorageKey.defaultCity);
    } else {
      localStorage.setItem(LocalStorageKey.defaultCity, JSON.stringify(city));
    }
  }

  get defaultCity(): City {
    const item = localStorage.getItem(LocalStorageKey.defaultCity);
    return item == null ? undefined : JSON.parse(item);
  }

  set defaultGym(gym: Gym) {
    this.subject.next(SettingsEvent.favoriteGymSet);
    if (gym === undefined || gym == null) {
      localStorage.removeItem(LocalStorageKey.defaultGym);
    } else {
      localStorage.setItem(LocalStorageKey.defaultGym, JSON.stringify(gym));
    }
  }

  get defaultGym(): Gym {
    const item = localStorage.getItem(LocalStorageKey.defaultGym);
    return item == null ? undefined : JSON.parse(item);
  }

  set defaultGymEnabled(enabled: boolean) {
    localStorage.setItem(LocalStorageKey.defaultGymEnabled, JSON.stringify(enabled));
  }

  get defaultGymEnabled(): boolean {
    return JSON.parse(localStorage.getItem(LocalStorageKey.defaultGymEnabled));
  }
}
