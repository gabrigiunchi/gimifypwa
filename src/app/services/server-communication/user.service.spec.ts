import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageKey} from 'src/app/model/local-storage-key';
import {City} from 'src/app/model/entities/city';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should set the default city', () => {
    const service: UserService = TestBed.get(UserService);
    service.defaultCity = {id: 1, name: 'MILANO'};
    const result: City = JSON.parse(localStorage.getItem(LocalStorageKey.defaultCity));
    expect(result.id).toBe(1);
    expect(result.name).toBe('MILANO');
  });

  it('should get the default city', () => {
    const service: UserService = TestBed.get(UserService);
    localStorage.setItem(LocalStorageKey.defaultCity, JSON.stringify({id: 1, name: 'MILANO'}));
    const result = service.defaultCity;
    expect(result.id).toBe(1);
    expect(result.name).toBe('MILANO');
  });

  it('should get undefined if the default city is not present in the local storage', () => {
    const service: UserService = TestBed.get(UserService);
    localStorage.clear();
    const result = service.defaultCity;
    expect(result === undefined).toBe(true);
  });
});
