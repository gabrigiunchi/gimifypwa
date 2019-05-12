import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {Observable} from 'rxjs';
import {Asset} from 'src/app/model/entities/asset';
import {DateService} from 'src/app/services/utils/date.service';
import {CacheService} from 'src/app/services/cache.service';


@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit, OnDestroy {

  readonly cityId: string;
  readonly gymId: string;
  readonly date: string;
  readonly from: string;
  readonly to: string;
  readonly kindId: string;

  result$: Observable<Asset[]>;
  clearCache = true;

  constructor(
    private cacheService: CacheService<unknown>,
    private dateService: DateService,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService) {

    this.kindId = this.getParam('kind');
    this.cityId = this.getParam('city');
    this.gymId = this.getParam('gym');
    this.date = this.getParam('date');
    this.from = this.getParam('from');
    this.to = this.getParam('to');
  }

  ngOnInit() {
    const completeStartDate = this.dateService.build(this.date, this.from);
    const completeEndDate = this.dateService.build(this.date, this.to);

    this.result$ = this.gymId !== undefined ?
      this.reservationService.getAvailableAssetsInGym(+this.kindId, +this.gymId, completeStartDate, completeEndDate) :
      this.reservationService.getAvailableAssetsInCity(+this.kindId, +this.cityId, completeStartDate, completeEndDate);
  }

  ngOnDestroy() {
    if (this.clearCache) {
      this.cacheService.clear();
    }
  }

  onBackClick() {
    this.clearCache = false;
  }

  private getParam(key: string): string {
    return this.activatedRoute.snapshot.paramMap.has(key) ? this.activatedRoute.snapshot.paramMap.get(key) : undefined;
  }

}
