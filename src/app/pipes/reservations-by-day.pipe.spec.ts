import { ReservationsByDayPipe } from './reservations-by-day.pipe';

describe('ReservationsByDayPipe', () => {
  it('create an instance', () => {
    const pipe = new ReservationsByDayPipe();
    expect(pipe).toBeTruthy();
  });
});
