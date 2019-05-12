import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchPageComponent} from './search-page.component';
import {TimePeriodPickerComponent} from '../../input/time-period-picker/time-period-picker.component';
import {DatepickerComponent} from '../../input/datepicker/datepicker.component';
import {LocationPickerComponent} from '../../input/location-picker/location-picker.component';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AssetKindPickerComponent} from '../../input/asset-kind-picker/asset-kind-picker.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MaxEndTimePipe} from '../../../pipes/date/max-end-time.pipe';
import {MinEndTimePipe} from '../../../pipes/date/min-end-time.pipe';
import {Router, RouterModule} from '@angular/router';
import {TestConstants} from 'src/app/test-constants';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {MinStartTimePipe} from 'src/app/pipes/date/min-start-time.pipe';
import {AssetKindEnum} from 'src/app/model/entities/type/asset-kind-enum';
import {DateTime} from 'luxon';
import {DateService} from 'src/app/services/utils/date.service';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchPageComponent,
        TimePeriodPickerComponent,
        DateTimePipe,
        DatepickerComponent,
        LocationPickerComponent,
        AssetKindPickerComponent,
        MaxEndTimePipe,
        MinEndTimePipe,
        MinStartTimePipe
      ],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
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
    component.step = 30;
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

  it('should change the interval when the assetkind changes if the duration is not valid', () => {
    component.searchParams.startHour = '10:00';
    component.searchParams.endHour = '16:00';
    component.onKindSelected({id: 1, name: AssetKindEnum.PRESSA, maxReservationTime: 60});
    expect(component.searchParams.endHour).toBe('11:00');
  });

  it('should not change the interval when the assetkind changes if the duration is valid', () => {
    component.searchParams.startHour = '10:00';
    component.searchParams.endHour = '10:30';
    component.onKindSelected({id: 1, name: AssetKindEnum.PRESSA, maxReservationTime: 60});
    expect(component.searchParams.endHour).toBe('10:30');
  });

  it('should change the interval when the date changes if if startTime < currentTime and date=currentDate', () => {
    const dateService: DateService = TestBed.get(DateService);
    component.searchParams.startHour = DateTime.fromISO(dateService.roundCurrentTime(30)).minus({minutes: 30}).toFormat('HH:mm');
    component.searchParams.endHour = '23:30';
    component.onDateChange(DateTime.local().toISODate());
    expect(component.searchParams.startHour).toBe(dateService.roundCurrentTime(30));
    expect(component.searchParams.endHour)
      .toBe(DateTime.fromISO(dateService.roundCurrentTime(30)).plus({minutes: 30}).toFormat('HH:mm'));
  });

  it('should not change the interval when the date changes if date!=currentDate', () => {
    component.searchParams.startHour = '10:00';
    component.searchParams.endHour = '10:30';
    component.onDateChange(DateTime.local().plus({days: 1}).toISODate());
    expect(component.searchParams.startHour).toBe('10:00');
    expect(component.searchParams.endHour).toBe('10:30');
  });

  it('should change the end when changing the start if the duration is not valid', () => {
    component.searchParams.kind.maxReservationTime = 30;
    component.searchParams.startHour = '10:00';
    component.searchParams.endHour = '10:30';
    component.onStartChange('09:00');
    expect(component.searchParams.startHour).toBe('09:00');
    expect(component.searchParams.endHour).toBe('09:30');
  });

  it('should not change the end when changing the start if the duration is valid', () => {
    component.searchParams.kind.maxReservationTime = 60;
    component.searchParams.startHour = '10:00';
    component.searchParams.endHour = '11:00';
    component.onStartChange('10:30');
    expect(component.searchParams.startHour).toBe('10:30');
    expect(component.searchParams.endHour).toBe('11:00');
  });

});
