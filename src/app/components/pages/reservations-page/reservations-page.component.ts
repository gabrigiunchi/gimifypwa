import {Component, OnInit} from '@angular/core';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {Observable} from 'rxjs';
import {Reservation} from 'src/app/model/entities/reservation';

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css']
})
export class ReservationsPageComponent implements OnInit {

  reservations$: Observable<Reservation[]>;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservations$ = this.reservationService.myFutureReservations;
  }

}
