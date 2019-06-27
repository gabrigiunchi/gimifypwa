import {Pipe, PipeTransform} from '@angular/core';
import {Reservation} from '../model/entities/reservation';
import {DateTime} from 'luxon';

@Pipe({
  name: 'reservationsByDay'
})
export class ReservationsByDayPipe implements PipeTransform {

  transform(reservations: Reservation[], ascending = true): Map<string, Reservation[]> {
    const result = new Map<string, Reservation[]>();
    reservations
      .sort((a, b) => a.start.localeCompare(b.start) * (ascending ? 1 : -1))
      .forEach(reservation => {
        const day = DateTime.fromISO(reservation.start, {zone: reservation.asset.gym.city.zoneId}).toISODate();

        if (!result.has(day)) {
          result.set(day, []);
        }

        result.get(day).push(reservation);
      });

    return result;
  }

}
