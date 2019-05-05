import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {City} from 'src/app/model/entities/city';
import {Gym} from 'src/app/model/entities/gym';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {CityService} from 'src/app/services/server-communication/city.service';
import {finalize} from 'rxjs/operators';

export enum SelectLocatioStep {
  city = 0,
  gym = 1
}

export interface SelectLocationResult {
  city: City;
  gym: Gym;
}

export interface SelectLocationInput extends SelectLocationResult {
  step: SelectLocatioStep;
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

  cities: City[];
  gyms: Gym[];

  currentStep = 0;

  constructor(
    private cityService: CityService,
    private gymService: GymService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SelectLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public input: SelectLocationInput) {

    this.cityFormGroup = this.formBuilder.group({
      city: [undefined, Validators.required]
    });

    this.gymFormGroup = this.formBuilder.group({
      gym: [undefined]
    });

    this.currentStep = this.input.step;
  }

  ngOnInit() {
    this.loadCities();
  }

  onCitySelected(city: City) {
    console.log('Selected city ', city);
    this.selectedCity = city;

    if (city !== undefined) {
      this.loadGymsOfCity(city);
      this.currentStep = SelectLocatioStep.gym;
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
    this.dialogRef.close();
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
    this.cityService.cities
      .pipe(finalize(() => this.isLoadingCities = false))
      .subscribe(
        cities => {
          this.cities = cities;
          if (!!(this.input && this.input.city)) {
            this.selectedCity = this.cities.find(c => c.id === this.input.city.id);
            this.loadGymsOfCity(this.selectedCity);
          } else {
            this.selectedCity = undefined;
          }
        },
        error => {
          console.log(error);
          this.errorLoadingCities = true;
        }
      );
  }

  private loadGymsOfCity(city: City) {
    this.isLoadingGyms = true;
    this.gymService.getGymsByCity(city)
      .pipe(finalize(() => this.isLoadingGyms = false))
      .subscribe(
        gyms => {
          this.gyms = gyms;
          if (!!(this.input && this.input.gym)) {
            this.selectedGym = this.gyms.find(g => g.id === this.input.gym.id);
          } else {
            this.selectedGym = undefined;
          }
        },
        error => {
          console.log(error);
          this.errorLoadingGyms = true;
        }
      );
  }
}