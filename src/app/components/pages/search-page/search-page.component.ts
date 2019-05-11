import {Component} from '@angular/core';
import {ReservationSearchParams} from 'src/app/services/server-communication/reservation.service';
import {DateTime, Duration} from 'luxon';
import {DateService} from 'src/app/services/utils/date.service';
import {CONSTANTS} from 'src/app/constants';
import {CacheService} from 'src/app/services/cache.service';
import {Router} from '@angular/router';
import {AssetKind} from 'src/app/model/entities/asset-kind';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  searchParams: ReservationSearchParams;

  constructor(
    private cacheService: CacheService<ReservationSearchParams>,
    private router: Router,
    private dateService: DateService) {

    if (this.cacheService.isPresent) {
      this.searchParams = this.cacheService.element;
    } else {
      this.initParams();
    }
  }

  search() {
    let url = `/search/kind/${this.searchParams.kind.id}` +
      `/date/${this.searchParams.date}/from/${this.searchParams.startHour}/to/${this.searchParams.endHour}` +
      `/city/${this.searchParams.location.city.id}`;

    if (this.searchParams.location.gym) {
      url += `/gym/${this.searchParams.location.gym.id}`;
    }

    this.cacheService.element = this.searchParams;
    this.router.navigate([url]);
  }

  onKindSelected(kind: AssetKind) {
    this.searchParams.kind = kind;

    if (!this.dateService.isRangeValid(this.searchParams.startHour, this.searchParams.endHour, this.maxDuration)) {
      this.searchParams.endHour = DateTime.fromISO(this.searchParams.startHour)
        .plus({minutes: kind.maxReservationTime}).toFormat('HH:mm');
    }
  }

  get maxDuration(): Duration {
    return Duration.fromObject({minutes: this.searchParams.kind ? this.searchParams.kind.maxReservationTime : 1440});
  }

  private initParams() {
    const start = this.dateService.roundCurrentTime(CONSTANTS.RESERVATION_TIME_SLOT_IN_MINUTES);
    const end = DateTime.fromISO(start).plus({minutes: CONSTANTS.RESERVATION_TIME_SLOT_IN_MINUTES}).toFormat('HH:mm');

    this.searchParams = {
      date: DateTime.local().toISODate(),
      startHour: start,
      endHour: end,
      kind: undefined,
      location: {city: undefined, gym: undefined},
    };
  }

}
