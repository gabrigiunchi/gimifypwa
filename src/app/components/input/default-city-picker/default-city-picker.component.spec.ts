import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultCityPickerComponent} from './default-city-picker.component';
import {MatIconModule, MatDialogModule} from '@angular/material';

describe('DefaultCityPickerComponent', () => {
  let component: DefaultCityPickerComponent;
  let fixture: ComponentFixture<DefaultCityPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultCityPickerComponent],
      imports: [
        MatIconModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
