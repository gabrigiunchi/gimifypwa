import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LocationPickerComponent} from './location-picker.component';
import {MatDialogModule, MatIconModule, MatInputModule} from '@angular/material';
import {CityNamePipe} from 'src/app/pipes/city-name.pipe';

describe('LocationPickerComponent', () => {
  let component: LocationPickerComponent;
  let fixture: ComponentFixture<LocationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationPickerComponent, CityNamePipe],
      imports: [
        MatIconModule,
        MatDialogModule,
        MatInputModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
