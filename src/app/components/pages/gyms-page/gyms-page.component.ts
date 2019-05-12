import {Component, OnDestroy, OnInit} from '@angular/core';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {Gym} from 'src/app/model/entities/gym';
import {CacheService} from 'src/app/services/cache.service';
import {MatDialog} from '@angular/material';
import {FilterResult} from 'src/app/model/filter-result';
import {City} from 'src/app/model/entities/city';
import {finalize} from 'rxjs/operators';
import {SelectCityDialogComponent} from '../../modals/dialogs/select-city-dialog/select-city-dialog.component';

export interface GymFilterParams {
  name: string;
  city: City;
  ratingGreaterThan: number;
}

@Component({
  selector: 'app-gyms-page',
  templateUrl: './gyms-page.component.html',
  styleUrls: ['./gyms-page.component.css']
})
export class GymsPageComponent implements OnInit, OnDestroy {

  filterResult: FilterResult<Gym, GymFilterParams> = {
    content: [],
    result: [],
    params: {city: undefined, name: '', ratingGreaterThan: 0}
  };
  isLoading = false;
  private clearCache = true;

  constructor(
    private dialog: MatDialog,
    private cacheService: CacheService<FilterResult<Gym, GymFilterParams>>,
    private gymService: GymService) {
  }

  ngOnInit() {
    if (this.cacheService.isPresent) {
      console.log('Loaded gyms from cache');
      this.filterResult = this.cacheService.element;
    } else {
      this.isLoading = true;
      console.log('Loading gyms from server...');
      this.gymService.gyms
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(gyms => {
          this.filterResult.content = gyms;
          this.result = gyms;
        });
    }
  }

  ngOnDestroy() {
    if (this.clearCache) {
      this.cacheService.clear();
    }
  }

  onGymClick() {
    this.cacheService.element = this.filterResult;
    this.clearCache = false;
  }

  filter() {
    this.result = this.filterResult.content;

    if (this.filterResult.params.name.length > 0) {
      this.result = this.result
        .filter(g => g.name.toLowerCase().includes(this.filterResult.params.name.toLowerCase()));
    }

    if (this.filterResult.params.city) {
      this.result = this.result.filter(g => g.city.id === this.filterResult.params.city.id);
    }
  }

  pickCity() {
    this.dialog.open(SelectCityDialogComponent, {
      restoreFocus: false,
      autoFocus: false,
      minWidth: '100%',
      height: '100%'
    }).afterClosed().subscribe((result: City) => {
      if (result) {
        this.cityFilter = result;
        console.log('Selected city', result);
      }
    });
  }

  get nameFilter(): string {
    return this.filterResult.params.name;
  }

  set nameFilter(name: string) {
    this.filterResult.params.name = name;
    this.filter();
  }

  get result(): Gym[] {
    return this.filterResult.result;
  }

  set result(gyms: Gym[]) {
    this.filterResult.result = gyms;
  }

  get cityFilter(): City {
    return this.filterResult.params.city;
  }

  set cityFilter(city: City) {
    this.filterResult.params.city = city;
    this.filter();
  }

}
