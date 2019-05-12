import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {Reservation} from 'src/app/model/entities/reservation';
import {CacheService} from 'src/app/services/cache.service';

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css']
})
export class ReservationsPageComponent implements OnInit, OnDestroy {

  reservations: Reservation[];
  private clearCache = true;

  constructor(
    private cacheService: CacheService<Reservation[]>,
    private reservationService: ReservationService) {
  }

  ngOnInit() {
    if (this.cacheService.isPresent) {
      console.log('Loaded reservations from cache');
      this.reservations = this.cacheService.element;
    } else {
      console.log('Loading reservations from server...');
      this.reservationService.myFutureReservations.subscribe(reservations => this.reservations = reservations);
    }
  }

  ngOnDestroy() {
    if (this.clearCache) {
      this.cacheService.clear();
    }
  }

  onReservationClick() {
    this.cacheService.element = this.reservations;
    this.clearCache = false;
  }

}
