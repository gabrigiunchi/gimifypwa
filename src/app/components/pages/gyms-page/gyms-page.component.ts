import {Component, OnDestroy, OnInit} from '@angular/core';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {Gym} from 'src/app/model/entities/gym';
import {Subscription} from 'rxjs';
import {CacheService} from 'src/app/services/cache.service';

@Component({
  selector: 'app-gyms-page',
  templateUrl: './gyms-page.component.html',
  styleUrls: ['./gyms-page.component.css']
})
export class GymsPageComponent implements OnInit, OnDestroy {

  gyms: Gym[];
  private subscriptions: Subscription[] = [];
  private clearCache = true;

  constructor(
    private cacheService: CacheService<Gym[]>,
    private gymService: GymService) {
  }

  ngOnInit() {
    if (this.cacheService.isPresent) {
      console.log('Loaded gyms from cache');
      this.gyms = this.cacheService.element;
    } else {
      console.log('Loading gyms from server...');
      this.gymService.gyms.subscribe(gyms => this.gyms = gyms);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    if (this.clearCache) {
      this.cacheService.clear();
    }
  }

  onGymClick() {
    this.cacheService.element = this.gyms;
    this.clearCache = false;
  }

}
