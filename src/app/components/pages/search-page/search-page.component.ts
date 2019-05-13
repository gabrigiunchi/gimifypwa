import {Component, OnDestroy} from '@angular/core';
import {ReservationSearchParams, ReservationService} from 'src/app/services/server-communication/reservation.service';
import {DateTime, Duration} from 'luxon';
import {DateService} from 'src/app/services/utils/date.service';
import {CONSTANTS} from 'src/app/constants';
import {Router} from '@angular/router';
import {AssetKind} from 'src/app/model/entities/asset-kind';
import {SettingsService} from 'src/app/services/settings.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnDestroy {

  searchParams: ReservationSearchParams;
  step = CONSTANTS.RESERVATION_TIME_SLOT_IN_MINUTES;
  clearCache = true;

  constructor(
    private settingsService: SettingsService,
    private reservationService: ReservationService,
    private router: Router,
    private dateService: DateService) {

    if (this.reservationService.isPresent) {
      this.searchParams = this.reservationService.element;
    } else {
      this.initParams();
    }
  }

  ngOnDestroy() {
    if (this.clearCache) {
      this.reservationService.clear();
    }
  }

  search() {
    let url = `/search/kind/${this.searchParams.kind.id}` +
      `/date/${this.searchParams.date}/from/${this.searchParams.startHour}/to/${this.searchParams.endHour}` +
      `/city/${this.searchParams.location.city.id}`;

    if (this.searchParams.location.gym) {
      url += `/gym/${this.searchParams.location.gym.id}`;
    }

    this.clearCache = false;
    this.reservationService.element = this.searchParams;
    this.router.navigate([url]);
  }

  onKindSelected(kind: AssetKind) {
    this.searchParams.kind = kind;
    this.checkDuration();
  }

  onStartChange(start: string) {
    this.searchParams.startHour = start;
    this.checkDuration();
  }

  onDateChange(date: string) {
    this.searchParams.date = date;
    this.checkStartTime();
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
      location: {city: this.settingsService.defaultCity, gym: this.settingsService.defaultGym},
    };
  }

  private checkStartTime() {
    if (this.dateService.isToday(this.searchParams.date) &&
      DateTime.fromISO(this.dateService.roundCurrentTime(this.step)) > DateTime.fromISO(this.searchParams.startHour)) {

      this.searchParams.startHour = this.dateService.roundCurrentTime(this.step);
      this.searchParams.endHour = DateTime.fromISO(this.searchParams.startHour).plus({minutes: this.step}).toFormat('HH:mm');
    }
  }

  private checkDuration() {
    if (!this.dateService.isRangeValid(this.searchParams.startHour, this.searchParams.endHour, this.maxDuration)) {
      this.searchParams.endHour = DateTime.fromISO(this.searchParams.startHour)
        .plus({minutes: this.searchParams.kind.maxReservationTime}).toFormat('HH:mm');
    }
  }

}
