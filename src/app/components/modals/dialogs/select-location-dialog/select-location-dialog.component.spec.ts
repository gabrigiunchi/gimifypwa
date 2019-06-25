import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectLocationDialogComponent, SelectLocationResult, SelectLocationStep} from './select-location-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatIconModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatStepperModule
} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CityService} from 'src/app/services/server-communication/city.service';
import {of, throwError} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {GymService} from 'src/app/services/server-communication/gym.service';

describe('SelectLocationDialogComponent', () => {
  let component: SelectLocationDialogComponent;
  let fixture: ComponentFixture<SelectLocationDialogComponent>;
  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectLocationDialogComponent],
      imports: [
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        ScrollingModule,
        MatIconModule,
        MatStepperModule,
        MatRadioModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
        {provide: MAT_DIALOG_DATA, useValue: {gym: undefined, city: undefined}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should abort', () => {
    const spy = spyOn(dialogRef, 'close').and.callThrough();
    component.abort();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should submit', () => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([TestConstants.mockCity]));
    component.selectedCity = TestConstants.mockCity;
    component.selectedGym = TestConstants.mockGym;
    const spy = spyOn(dialogRef, 'close').and.callThrough();
    component.submit();
    const result: SelectLocationResult = {city: TestConstants.mockCity, gym: TestConstants.mockGym};
    expect(spy).toHaveBeenCalledWith(result);
  });

  it('should change the selection', () => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([TestConstants.mockCity]));
    component.onSelectionChange({previouslySelectedIndex: 1, previouslySelectedStep: undefined, selectedIndex: 2, selectedStep: undefined});
    expect(component.currentStep).toBe(2);
  });

  it('should select the city', () => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([TestConstants.mockCity]));
    component.selectedGym = TestConstants.mockGym;
    const spyOnLoadGyms = spyOn(TestBed.get(GymService), 'getGymsByCity').and.returnValue(of([]));
    component.selectedCity = undefined;
    const city = TestConstants.mockCity;
    component.onCitySelected(city);
    expect(component.selectedCity).toEqual(city);
    expect(spyOnLoadGyms).toHaveBeenCalledWith(city);
    expect(component.currentStep).toBe(SelectLocationStep.gym);
    expect(component.selectedGym).toBe(undefined);
  });

  it('should select an undefined city', () => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([TestConstants.mockCity]));
    component.selectedGym = TestConstants.mockGym;
    const city = undefined;
    const spyOnLoadGyms = spyOn(TestBed.get(GymService), 'getGymsByCity').and.returnValue(of([]));
    component.selectedCity = city;
    component.currentStep = SelectLocationStep.city;
    component.onCitySelected(city);
    expect(component.selectedCity).toEqual(city);
    expect(spyOnLoadGyms).not.toHaveBeenCalled();
    expect(component.currentStep).toBe(SelectLocationStep.city);
    expect(component.selectedGym).toEqual(TestConstants.mockGym);
  });

  it('should select the city and pre-select the gym if provided', () => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([TestConstants.mockCity]));
    const gym = TestConstants.mockGym;
    const city = TestConstants.mockGym.city;
    component.input.gym = gym;
    const spyOnLoadGyms = spyOn(TestBed.get(GymService), 'getGymsByCity').and.returnValue(of([gym]));
    component.selectedCity = undefined;
    component.onCitySelected(city);
    expect(component.selectedCity).toEqual(city);
    expect(spyOnLoadGyms).toHaveBeenCalledWith(city);
    expect(component.currentStep).toBe(SelectLocationStep.gym);
    expect(component.selectedGym).toEqual(gym);
  });

  it('should select the gym', () => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([TestConstants.mockCity]));
    component.selectedGym = undefined;
    const gym = TestConstants.mockGym;
    component.onGymSelected(gym);
    expect(component.selectedGym).toEqual(gym);
  });

  it('should load the cities and select the one in input', () => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([TestConstants.mockCity]));
    component.selectedCity = TestConstants.mockCity;
    component.currentStep = SelectLocationStep.city;
    component.input.city = undefined;
    const spyOnLoadGyms = spyOn(TestBed.get(GymService), 'getGymsByCity').and.returnValue(of([]));
    component.loadCities();
    expect(spyOnLoadGyms).not.toHaveBeenCalled();
    expect(component.selectedCity).toBeUndefined();
    expect(component.currentStep).toBe(SelectLocationStep.city);
  });

  it('should load the cities and select the one in input', () => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([TestConstants.mockCity]));
    component.selectedCity = undefined;
    component.currentStep = SelectLocationStep.city;
    const city = TestConstants.mockCity;
    component.input.city = city;
    const spyOnLoadGyms = spyOn(TestBed.get(GymService), 'getGymsByCity').and.returnValue(of([]));
    component.loadCities();
    expect(spyOnLoadGyms).toHaveBeenCalledWith(city);
    expect(component.selectedCity).toEqual(city);
    expect(component.currentStep).toBe(SelectLocationStep.city);
  });

  it('should handle errors when downloading cities', () => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(throwError('error'));
    component.loadCities();
    expect(component.errorLoadingCities).toBe(true);
  });

  it('should handle errors when downloading gyms', () => {
    spyOn(TestBed.get(GymService), 'getGymsByCity').and.returnValue(throwError('error'));
    component.loadGymsOfCity(TestConstants.mockCity);
    expect(component.errorLoadingGyms).toBe(true);
  });
});
