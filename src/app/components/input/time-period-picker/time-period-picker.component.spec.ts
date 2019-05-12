import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TimePeriodPickerComponent} from './time-period-picker.component';
import {MatIconModule, NativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Duration} from 'luxon';
import {MaxEndTimePipe} from '../../../pipes/date/max-end-time.pipe';
import {MinEndTimePipe} from '../../../pipes/date/min-end-time.pipe';
import {MinStartTimePipe} from 'src/app/pipes/date/min-start-time.pipe';

describe('TimePeriodPickerComponent', () => {
  let component: TimePeriodPickerComponent;
  let fixture: ComponentFixture<TimePeriodPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimePeriodPickerComponent,
        MaxEndTimePipe,
        MinEndTimePipe,
        MinStartTimePipe,
      ],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        NativeDateModule,
        HttpClientTestingModule,
        NgxMaterialTimepickerModule
      ],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePeriodPickerComponent);
    component = fixture.componentInstance;
    component.min = '00:00';
    component.max = '23:00';
    component.start = '10:00';
    component.end = '10:30';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the end when the start changes if start >= end', () => {
    component.step = 30;
    expect(component.start).toBe('10:00');
    expect(component.end).toBe('10:30');
    component.startSet('17:00');
    expect(component.end).toBe('17:30');
  });

  it('should not be valid if start < min', () => {
    component.min = '10:00';
    component.start = '08:00';
    expect(component.isValid).toBe(false);
  });

  it('should not be valid if end > max', () => {
    component.max = '10:00';
    component.end = '17:00';
    expect(component.isValid).toBe(false);
  });

  it('should not be valid if start > end', () => {
    component.start = '18:00';
    component.end = '10:00';
    expect(component.isValid).toBe(false);
  });

  it('should not be valid if start or end is empty string', () => {
    component.start = '';
    component.end = '';
    expect(component.isValid).toBe(false);
  });

  it('should not be valid if the duration exceeds the max', () => {
    component.maxDuration = Duration.fromObject({minutes: 30});

    component.start = '10:00';
    component.end = '10:30';
    expect(component.isValid).toBe(true);

    component.start = '10:00';
    component.end = '10:31';
    expect(component.isValid).toBe(false);
  });

});
