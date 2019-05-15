import {ReservationTimePipe} from './reservation-time.pipe';
import {Reservation} from 'src/app/model/entities/reservation';
import {TestConstants} from 'src/app/test-constants';

describe('ReservationTimePipe', () => {

  const reservation: Reservation = TestConstants.mockReservations[0];

  it('create an instance', () => {
    const pipe = new ReservationTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should format a reservation time', () => {
    const pipe = new ReservationTimePipe();
    reservation.start = '2019-05-10T10:00:00-0400';
    reservation.end = '2019-05-10T10:30:00-0400';
    reservation.asset.gym.city.zoneId = 'America/New_York';
    expect(pipe.transform(reservation)).toBe('10:00 - 10:30');
    expect(pipe.transform(reservation, ' ')).toBe('10:00 10:30');
  });
});
