import {Pipe, PipeTransform} from '@angular/core';
import {Reservation} from '../model/entities/reservation';
import {DateTime} from 'luxon';

@Pipe({
  name: 'reservationsByDay'
})
export class ReservationsByDayPipe implements PipeTransform {

  transform(reservations: Reservation[], ascending = true): Map<string, Reservation[]> {
    const result = new Map<string, Reservation[]>();
    if (reservations) {
      reservations.forEach(reservation => {
        const day = DateTime.fromISO(reservation.start).toISODate();

        if (!result.has(day)) {
          result.set(day, []);
        }

        result.get(day).push(reservation);
      });
    }

    return result;
  }

}
