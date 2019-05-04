import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatStepper} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {City} from 'src/app/model/entities/city';
import {Gym} from 'src/app/model/entities/gym';
import {Asset} from 'src/app/model/entities/asset';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {Observable, of} from 'rxjs';
import {CityService} from 'src/app/services/server-communication/city.service';
import {catchError, finalize, tap} from 'rxjs/operators';

export interface SelectLocationResult {
  city: City;
  gym: Gym;
}

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.css']
})
export class SelectLocationComponent implements OnInit {

  cityFormGroup: FormGroup;
  gymFormGroup: FormGroup;

  isLoadingCities = false;
  isLoadingGyms = false;

  errorLoadingCities = false;
  errorLoadingGyms = false;

  cities$: Observable<City[]>;
  gyms$: Observable<Gym[]>;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private cityService: CityService,
    private gymService: GymService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SelectLocationComponent>) {

    this.cityFormGroup = this.formBuilder.group({
      city: [undefined, Validators.required]
    });

    this.gymFormGroup = this.formBuilder.group({
      gym: [undefined]
    });
  }

  ngOnInit() {
    this.loadCities();
  }

  onCitySelected(city: City) {
    console.log('Selected city ', city);
    this.selectedCity = city;

    if (city !== undefined) {
      this.loadGymsOfCity(city);
      this.stepper.next();
    }
  }

  onGymSelected(gym: Gym) {
    console.log('Selected gym ', gym);
    this.selectedGym = gym;
  }

  submit() {
    const result: SelectLocationResult = {
      city: this.selectedCity,
      gym: this.selectedGym
    };
    this.dialogRef.close(result);
  }

  abort() {
    this.dialogRef.close({city: undefined, gym: undefined});
  }

  get selectedCity(): City {
    return this.cityFormGroup.get('city').value;
  }

  set selectedCity(city: City) {
    this.cityFormGroup.patchValue({city: city});
  }

  get selectedGym(): Gym {
    return this.gymFormGroup.get('gym').value;
  }

  set selectedGym(gym: Gym) {
    this.gymFormGroup.patchValue({gym: gym});
  }

  private loadCities() {
    this.isLoadingCities = true;
    this.cities$ = this.cityService.cities
      .pipe(
        finalize(() => this.isLoadingCities = false),
        catchError(error => {
          console.log(error);
          this.errorLoadingCities = true;
          return of([]);
        }));
  }

  private loadGymsOfCity(city: City) {
    this.isLoadingGyms = true;
    this.gyms$ = this.gymService.getGymsByCity(city)
      .pipe(
        finalize(() => this.isLoadingGyms = false),
        catchError(error => {
          console.log(error);
          this.errorLoadingGyms = true;
          return of([]);
        }));
  }
}
