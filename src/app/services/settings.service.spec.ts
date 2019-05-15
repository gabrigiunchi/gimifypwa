import {TestBed} from '@angular/core/testing';
import {SettingsService} from './settings.service';
import {City} from '../model/entities/city';
import {LocalStorageKey} from '../model/local-storage-key';
import {TestConstants} from '../test-constants';

describe('SettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });

  it('should set the default city', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    service.defaultCity = TestConstants.mockCity;
    const result: City = JSON.parse(localStorage.getItem(LocalStorageKey.defaultCity));
    expect(result.id).toBe(1);
    expect(result.name).toBe('MILANO');
  });

  it('should get the default city', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    localStorage.setItem(LocalStorageKey.defaultCity, JSON.stringify({id: 1, name: 'MILANO'}));
    const result = service.defaultCity;
    expect(result.id).toBe(1);
    expect(result.name).toBe('MILANO');
  });

  it('should get undefined if the default city is not present in the local storage', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    localStorage.clear();
    const result = service.defaultCity;
    expect(result === undefined).toBe(true);
  });

  it('should enable the default gym', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    localStorage.clear();

    service.defaultGymEnabled = true;
    expect(service.defaultGymEnabled).toBe(true);

    service.defaultGymEnabled = false;
    expect(service.defaultGymEnabled).toBe(false);
  });
});
