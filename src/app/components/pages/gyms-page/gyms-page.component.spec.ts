import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GymFilterParams, GymsPageComponent} from './gyms-page.component';
import {
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import {Router, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {Gym} from 'src/app/model/entities/gym';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {of} from 'rxjs';
import {FilterResult} from 'src/app/model/filter-result';
import {SearchbarComponent} from '../../input/searchbar/searchbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TestConstants} from 'src/app/test-constants';
import {GymListComponent} from '../../layout/gym-list/gym-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MapComponent} from '../../layout/map/map.component';
import {AgmCoreModule} from '@agm/core';
import {GymAvatarPipe} from 'src/app/pipes/gym-avatar.pipe';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';

describe('GymsPageComponent', () => {
  let component: GymsPageComponent;
  let fixture: ComponentFixture<GymsPageComponent>;

  let spy: jasmine.Spy;
  const mockGyms: Gym[] = [
    {
      address: 'address1',
      city: TestConstants.mockCity,
      id: 1,
      name: 'gym1',
      latitude: 50,
      longitude: 10
    },
    {
      address: 'address2',
      city: {id: 2, name: 'TORINO', zoneId: 'Europe/Rome'},
      id: 2,
      name: 'gym2',
      latitude: 0,
      longitude: 0
    }
  ];

  let filterResult: FilterResult<Gym, GymFilterParams>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GymsPageComponent,
        LoadingComponent,
        SearchbarComponent,
        GymListComponent,
        MapComponent,
        GymAvatarPipe,
        SafeUrlPipe
      ],
      imports: [
        BrowserAnimationsModule,
        MatListModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        MatProgressSpinnerModule,
        ScrollingModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBiClW-tzn_XUpFDNs6c5PjwGtE61xaW6A'
        }),
        MatTabsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatChipsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    filterResult = {content: [], params: {name: '', city: undefined, ratingGreaterThan: 0}, result: []};
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
    const cacheService: GymService = TestBed.get(GymService);
    filterResult.content = mockGyms;
    cacheService.element = filterResult;
    component.ngOnInit();
    expect(spy).not.toHaveBeenCalledTimes(2);
  });

  it('should load the gyms from server if the cache does not contain anything', () => {
    expect(spy).toHaveBeenCalledTimes(1);
    const cacheService: GymService = TestBed.get(GymService);
    cacheService.clear();
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should clear the cache', () => {
    const cacheService: GymService = TestBed.get(GymService);
    const spyOnCache = spyOn(cacheService, 'clear').and.callThrough();
    component.ngOnDestroy();
    expect(spyOnCache).toHaveBeenCalled();
    expect(cacheService.isPresent).toBe(false);
  });

  it('should not clear the cache if a gym is selected', () => {
    const cacheService: GymService = TestBed.get(GymService);
    const spyOnCache = spyOn(cacheService, 'clear').and.callThrough();
    component.onGymClick(TestConstants.mockGym);
    component.ngOnDestroy();
    expect(spyOnCache).not.toHaveBeenCalled();
    expect(cacheService.isPresent).toBe(true);
  });

  it('should filter by name', () => {
    component.nameFilter = '1';
    expect(component.result.length).toBe(1);
    expect(component.result[0].id).toBe(1);
  });

  it('should filter by city', () => {
    component.cityFilter = TestConstants.mockCity;
    expect(component.result.length).toBe(1);
    expect(component.result[0].id).toBe(1);
  });
});
