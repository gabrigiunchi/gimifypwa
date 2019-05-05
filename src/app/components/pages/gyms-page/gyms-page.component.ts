import {Component, OnDestroy, OnInit} from '@angular/core';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {Gym} from 'src/app/model/entities/gym';
import {Subscription} from 'rxjs';
import {CacheService} from 'src/app/services/cache.service';
import {MatDialog} from '@angular/material';
import {GymFilterComponent, GymFilterResult} from '../../modals/gym-filter/gym-filter.component';
import {FilterResult} from 'src/app/model/filter-result';
import {City} from 'src/app/model/entities/city';

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
  private subscriptions: Subscription[] = [];
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
      console.log('Loading gyms from server...');
      this.gymService.gyms.subscribe(gyms => {
        this.filterResult.content = gyms;
        this.result = gyms;
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
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

  openFilterDialog() {
    this.dialog.open(GymFilterComponent, {
      minWidth: '100%',
      height: '100%',
      autoFocus: false,
      restoreFocus: false
    }).afterClosed().subscribe((result: GymFilterResult) => {
      if (result) {
        this.filterResult.params.city = result.city;
        this.filterResult.params.ratingGreaterThan = result.ratingGreaterThan;
        this.filter();
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
