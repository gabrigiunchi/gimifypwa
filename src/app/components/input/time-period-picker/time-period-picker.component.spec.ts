import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TimePeriodPickerComponent} from './time-period-picker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, NativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {Duration} from 'luxon';

describe('TimePeriodPickerComponent', () => {
  let component: TimePeriodPickerComponent;
  let fixture: ComponentFixture<TimePeriodPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimePeriodPickerComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDividerModule,
        NativeDateModule,
        HttpClientModule,
      ],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePeriodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be VALID if the start is before the end', () => {
    component.start = '08:00';
    component.end = '15:00';
    component.ngOnChanges();
    expect(component.form.valid).toBe(true);
  });

  it('should be INVALID if the start is after the end', () => {
    component.start = '18:00';
    component.end = '08:00';
    component.ngOnChanges();
    expect(component.form.valid).toBe(false);
  });

  it('should be INVALID if the start equal to the the end', () => {
    component.start = '18:00';
    component.end = '18:00';
    component.ngOnChanges();
    expect(component.form.valid).toBe(false);
  });

  it('should be VALID if the start is one hour after the min time', () => {
    component.min = '08:00';
    component.start = '09:00';
    component.end = '18:00';
    component.ngOnChanges();
    expect(component.form.valid).toBe(true);
  });

  it('should be VALID if the start is one minute after the min time', () => {
    component.min = '08:00';
    component.start = '08:01';
    component.end = '18:00';
    component.ngOnChanges();
    expect(component.form.valid).toBe(true);
  });

  it('should be VALID if the start is equal the min time', () => {
    component.min = '08:00';
    component.start = '08:00';
    component.end = '18:00';
    component.ngOnChanges();
    expect(component.form.valid).toBe(true);
  });

  it('should be INVALID if the start is one hour before the min time', () => {
    component.min = '16:00';
    component.start = '15:00';
    component.end = '18:00';
    component.ngOnChanges();
    expect(component.form.valid).toBe(false);
  });

  it('should be INVALID if the start is one minute before the min time', () => {
    component.min = '16:30';
    component.start = '16:29';
    component.end = '18:00';
    component.ngOnChanges();
    expect(component.form.valid).toBe(false);
  });

  it('should be valid if the duration is <= than the max', () => {
    component.maxDuration = Duration.fromObject({minutes: 20});
    component.min = '00:00';
    component.start = '16:00';
    component.end = '16:20';
    component.ngOnChanges();
    expect(component.form.valid).toBe(true);
  });

  it('should be INVALID if the duration is > than the max', () => {
    component.maxDuration = Duration.fromObject({minutes: 20});
    component.min = '00:00';
    component.start = '16:00';
    component.end = '16:21';
    component.ngOnChanges();
    expect(component.form.valid).toBe(false);
  });
});
