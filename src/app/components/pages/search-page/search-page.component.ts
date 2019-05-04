import {Component, OnInit} from '@angular/core';
import {ReservationService, ReservationSearchParams} from 'src/app/services/server-communication/reservation.service';
import {DateTime, Duration} from 'luxon';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchParams: ReservationSearchParams = {
    date: DateTime.local().toISODate(),
    startHour: '10:00',
    endHour: '10:20',
    kind: undefined,
    location: {city: undefined, gym: undefined},
  };

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
  }

  search() {
    this.reservationService.searchAssets(this.searchParams).subscribe(assets => {
      console.log(assets);
    });
  }

  get maxDuration(): Duration {
    return Duration.fromObject({minutes: this.searchParams.kind ? this.searchParams.kind.maxReservationTime : 1440});
  }

}
