import {Pipe, PipeTransform} from '@angular/core';
import {Reservation} from 'src/app/model/entities/reservation';
import {TimePipe} from './time.pipe';

@Pipe({
  name: 'reservationTime'
})
export class ReservationTimePipe implements PipeTransform {

  transform(reservation: Reservation, separator = ' - '): string {
    const timePipe = new TimePipe();
    return timePipe.transform(reservation.start, reservation.asset.gym.city.zoneId) + separator +
      timePipe.transform(reservation.end, reservation.asset.gym.city.zoneId);
  }
}
