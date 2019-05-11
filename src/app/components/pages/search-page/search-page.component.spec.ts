import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchPageComponent} from './search-page.component';
import {TimePeriodPickerComponent} from '../../input/time-period-picker/time-period-picker.component';
import {DatepickerComponent} from '../../input/datepicker/datepicker.component';
import {LocationPickerComponent} from '../../input/select-location-form/location-picker.component';
import {MatDialogModule, MatDividerModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AssetKindPickerComponent} from '../../input/asset-kind-picker/asset-kind-picker.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MaxEndTimePipe} from '../../../pipes/date/max-end-time.pipe';
import {MinEndTimePipe} from '../../../pipes/date/min-end-time.pipe';
import {Router, RouterModule} from '@angular/router';
import {TestConstants} from 'src/app/test-constants';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchPageComponent,
        TimePeriodPickerComponent,
        DatepickerComponent,
        LocationPickerComponent,
        AssetKindPickerComponent,
        MaxEndTimePipe,
        MinEndTimePipe,
      ],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        NgxMaterialTimepickerModule,
        HttpClientTestingModule,
        MatDialogModule,
        RouterModule.forRoot([])
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

  it('should search assets in a city based on parameters', () => {
    const spy = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    component.search();
    expect(spy).toHaveBeenCalledWith(['/search/kind/1/date/2019-05-04/from/10:00/to/10:20/city/1']);
  });

  it('should search assets in a gym based on parameters', () => {
    const spy = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    component.searchParams.location.gym = TestConstants.mockGym;
    component.search();
    expect(spy).toHaveBeenCalledWith(['/search/kind/1/date/2019-05-04/from/10:00/to/10:20/city/1/gym/1']);
  });

});
