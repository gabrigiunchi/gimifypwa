import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DatepickerComponent} from './datepicker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatIconModule, MatInputModule, NativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        NativeDateModule,
        HttpClientTestingModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid if the date is between the min and the max', () => {
    component.min = '1980-01-01';
    component.date = '2018-10-10';
    component.ngOnChanges();
    expect(component.form.valid).toBe(true);
  });

  it('should be invalid if the date is before the min', () => {
    component.min = '2018-12-12';
    component.date = '2018-10-10';
    component.ngOnChanges();
    expect(component.form.valid).toBe(false);
  });

  it('should be invalid if the date is after the max', () => {
    component.max = '2000-12-12';
    component.date = '2018-10-10';
    component.ngOnChanges();
    expect(component.form.valid).toBe(false);
  });
});
