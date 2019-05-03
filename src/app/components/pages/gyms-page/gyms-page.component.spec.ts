import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GymsPageComponent} from './gyms-page.component';
import {MatListModule, MatProgressSpinnerModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {CacheService} from 'src/app/services/cache.service';
import {Gym} from 'src/app/model/entities/gym';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {of} from 'rxjs';

describe('GymsPageComponent', () => {
  let component: GymsPageComponent;
  let fixture: ComponentFixture<GymsPageComponent>;

  let spy: jasmine.Spy;
  const mockGyms: Gym[] = [
    {
      address: 'address1',
      city: {id: 1, name: 'Milano'},
      id: 1,
      name: 'gym1',
      zoneId: 'Europe/Rome'
    }
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GymsPageComponent, LoadingComponent],
      imports: [
        MatListModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        MatProgressSpinnerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spy = spyOnProperty(TestBed.get(GymService), 'gyms', 'get').and.returnValue(of(mockGyms));
    fixture = TestBed.createComponent(GymsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the gyms from cache if present', () => {
    expect(spy).toHaveBeenCalledTimes(1);
    const cacheService: CacheService<Gym[]> = TestBed.get(CacheService);
    cacheService.element = mockGyms;
    component.ngOnInit();
    expect(spy).not.toHaveBeenCalledTimes(2);
  });

  it('should load the gyms from server if the cache does not contain anything', () => {
    expect(spy).toHaveBeenCalledTimes(1);
    const cacheService: CacheService<Gym[]> = TestBed.get(CacheService);
    cacheService.clear();
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should clear the cache', () => {
    const cacheService: CacheService<Gym[]> = TestBed.get(CacheService);
    const spyOnCache = spyOn(cacheService, 'clear').and.callThrough();
    component.ngOnDestroy();
    expect(spyOnCache).toHaveBeenCalled();
    expect(cacheService.isPresent).toBe(false);
  });

  it('should not clear the cache if a gym is selected', () => {
    const cacheService: CacheService<Gym[]> = TestBed.get(CacheService);
    const spyOnCache = spyOn(cacheService, 'clear').and.callThrough();
    component.onGymClick();
    component.ngOnDestroy();
    expect(spyOnCache).not.toHaveBeenCalled();
    expect(cacheService.isPresent).toBe(true);
  });
});
