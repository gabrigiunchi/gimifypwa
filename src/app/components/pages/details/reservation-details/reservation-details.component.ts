import {Component, OnInit} from '@angular/core';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Reservation} from 'src/app/model/entities/reservation';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {

  reservation$: Observable<Reservation>;

  constructor(private reservationService: ReservationService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.reservation$ = this.reservationService.getMyReservationById(id);
  }

}
