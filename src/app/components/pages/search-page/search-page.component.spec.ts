import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchPageComponent} from './search-page.component';
import {TimePeriodPickerComponent} from '../../input/time-period-picker/time-period-picker.component';
import {DatepickerComponent} from '../../input/datepicker/datepicker.component';
import {SelectLocationFormComponent} from '../../input/select-location-form/select-location-form.component';
import {MatIconModule, MatInputModule, MatDividerModule, MatDialogModule} from '@angular/material';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AssetKindPickerComponent} from '../../input/asset-kind-picker/asset-kind-picker.component';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {of} from 'rxjs';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchPageComponent,
        TimePeriodPickerComponent,
        DatepickerComponent,
        SelectLocationFormComponent,
        AssetKindPickerComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        HttpClientTestingModule,
        MatDialogModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    component.searchParams = {
      date: '2019-05-04',
      startHour: '10:00',
      endHour: '10:20',
      kind: {id: 1, name: 'PRESSA', maxReservationTime: 20},
      location: {city: {id: 1, name: 'MILANO'}, gym: undefined}
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search assets based on parameters', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    const spy = spyOn(service, 'getAvailableAssets').and.returnValue(of([]));
    component.searchParams.location = undefined;
    component.search();
    expect(spy).toHaveBeenCalledWith(component.searchParams.kind, '2019-05-04T10:00:00+0200', '2019-05-04T10:20:00+0200');

    component.searchParams.location = {city: undefined, gym: undefined};
    component.search();
    expect(spy).toHaveBeenCalledWith(component.searchParams.kind, '2019-05-04T10:00:00+0200', '2019-05-04T10:20:00+0200');

  });

  it('should search assets in a city based on parameters', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    const spy = spyOn(service, 'getAvailableAssetsInCity').and.returnValue(of([]));
    component.search();
    expect(spy).toHaveBeenCalledWith(component.searchParams.kind, component.searchParams.location.city,
      '2019-05-04T10:00:00+0200', '2019-05-04T10:20:00+0200');
  });

  it('should search assets in a gym based on parameters', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    const spy = spyOn(service, 'getAvailableAssetsInGym').and.returnValue(of([]));
    component.searchParams.location.gym = {id: 1, name: '', address: '', zoneId: '', city: component.searchParams.location.city};
    component.search();
    expect(spy).toHaveBeenCalledWith(component.searchParams.kind, component.searchParams.location.gym,
      '2019-05-04T10:00:00+0200', '2019-05-04T10:20:00+0200');
  });

});
