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
import {of} from 'rxjs';
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
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([TestConstants.mockCity]));
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
    component.selectedCity = TestConstants.mockCity;
    component.selectedGym = TestConstants.mockGym;
    const spy = spyOn(dialogRef, 'close').and.callThrough();
    component.submit();
    const result: SelectLocationResult = {city: TestConstants.mockCity, gym: TestConstants.mockGym};
    expect(spy).toHaveBeenCalledWith(result);
  });

  it('should change the selection', () => {
    component.onSelectionChange({previouslySelectedIndex: 1, previouslySelectedStep: undefined, selectedIndex: 2, selectedStep: undefined});
    expect(component.currentStep).toBe(2);
  });

  it('should select the city', () => {
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
    component.selectedGym = undefined;
    const gym = TestConstants.mockGym;
    component.onGymSelected(gym);
    expect(component.selectedGym).toEqual(gym);
  });

  it('shoud load the cities and select the one in input', () => {
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
});
