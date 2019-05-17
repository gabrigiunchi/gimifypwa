import {ReservationsByDayPipe} from './reservations-by-day.pipe';
import {TestConstants} from '../test-constants';
import {Reservation} from '../model/entities/reservation';
import {Settings} from 'luxon';

describe('ReservationsByDayPipe', () => {
  let reservations: Reservation[] = [];

  beforeEach(() => {
    reservations = [
      {
        id: 1,
        asset: TestConstants.mockAsset,
        user: TestConstants.mockUser,
        start: '2019-05-15T10:00:00+0200',
        end: '2019-05-15T10:30:00+0200'
      },
      {
        id: 2,
        asset: TestConstants.mockAsset,
        user: TestConstants.mockUser,
        start: '2019-05-14T23:30:00-0400',
        end: '2019-05-14T23:45:00-0400'
      },
      {
        id: 3,
        asset: TestConstants.mockAsset,
        user: TestConstants.mockUser,
        start: '2019-05-15T00:00:00+0000',
        end: '2019-05-15T00:30:00+0000'
      },
      {
        id: 4,
        asset: TestConstants.mockAsset,
        user: TestConstants.mockUser,
        start: '2019-05-16T23:40:00+0000',
        end: '2019-05-16T23:50:00+0000'
      }
    ];
  });

  it('create an instance', () => {
    const pipe = new ReservationsByDayPipe();
    expect(pipe).toBeTruthy();
  });

  it('should group reservations by day', () => {
    reservations[0].asset.gym.city.zoneId = 'Europe/Rome';
    reservations[1].asset.gym.city.zoneId = 'America/New_York';
    reservations[2].asset.gym.city.zoneId = 'UTC';
    reservations[3].asset.gym.city.zoneId = 'UTC';
    const pipe = new ReservationsByDayPipe();
    const result = pipe.transform(reservations);
    expect(result.size).toBe(3);
    expect(Array.from(result.keys())).toEqual(['2019-05-14', '2019-05-15', '2019-05-16']);
    expect(result.get('2019-05-14').map(r => r.id)).toEqual([2]);
    expect(result.get('2019-05-15').map(r => r.id)).toEqual([3, 1]);
    expect(result.get('2019-05-16').map(r => r.id)).toEqual([4]);
  });

  it('the result should be the same regardless of the timezone of the device', () => {
    reservations[0].asset.gym.city.zoneId = 'Europe/Rome';
    reservations[1].asset.gym.city.zoneId = 'America/New_York';
    reservations[2].asset.gym.city.zoneId = 'UTC';
    reservations[3].asset.gym.city.zoneId = 'UTC';
    const pipe = new ReservationsByDayPipe();

    const expectFn = (result: Map<string, Reservation[]>) => {
      expect(result.size).toBe(3);
      expect(Array.from(result.keys())).toEqual(['2019-05-14', '2019-05-15', '2019-05-16']);
      expect(result.get('2019-05-14').map(r => r.id)).toEqual([2]);
      expect(result.get('2019-05-15').map(r => r.id)).toEqual([3, 1]);
      expect(result.get('2019-05-16').map(r => r.id)).toEqual([4]);
    };

    Settings.defaultZoneName = 'UTC';
    expectFn(pipe.transform(reservations));

    Settings.defaultZoneName = 'Europe/London';
    expectFn(pipe.transform(reservations));

    Settings.defaultZoneName = 'Europe/Rome';
    expectFn(pipe.transform(reservations));

    Settings.defaultZoneName = 'America/Los_Angeles';
    expectFn(pipe.transform(reservations));

    Settings.defaultZoneName = 'America/New_York';
    expectFn(pipe.transform(reservations));
  });

  it('should group reservations by day in descending order', () => {
    reservations[0].asset.gym.city.zoneId = 'Europe/Rome';
    reservations[1].asset.gym.city.zoneId = 'America/New_York';
    reservations[2].asset.gym.city.zoneId = 'UTC';
    reservations[3].asset.gym.city.zoneId = 'UTC';
    const pipe = new ReservationsByDayPipe();
    const result = pipe.transform(reservations, false);
    expect(result.size).toBe(3);
    console.log(result);
    expect(Array.from(result.keys())).toEqual(['2019-05-16', '2019-05-15', '2019-05-14']);
    expect(result.get('2019-05-16').map(r => r.id)).toEqual([4]);
    expect(result.get('2019-05-15').map(r => r.id)).toEqual([1, 3]);
    expect(result.get('2019-05-14').map(r => r.id)).toEqual([2]);
  });
});
