import {Component, Input, OnChanges} from '@angular/core';
import {Reservation} from 'src/app/model/entities/reservation';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {

  @Input() reservations: Reservation[] = [];
}
