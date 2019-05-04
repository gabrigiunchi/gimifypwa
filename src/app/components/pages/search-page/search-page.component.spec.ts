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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
