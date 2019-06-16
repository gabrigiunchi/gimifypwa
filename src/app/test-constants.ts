import {User} from './model/entities/user';
import {Gym} from './model/entities/gym';
import {Asset} from './model/entities/asset';
import {Reservation} from './model/entities/reservation';
import {City} from './model/entities/city';
import {Observable, of} from 'rxjs';
import {Timetable} from './model/entities/timetable';

export class MockDialog {
  afterClosed(): Observable<any> {
    return of({});
  }

  dismiss() {}
}

export class TestConstants {


  static get mockUser(): User {
    return {
      email: 'gabri@gmail.com',
      id: 1,
      name: 'Gabriele',
      surname: 'Giunchi',
      username: 'gabrigiunchi',
      notificationsEnabled: true
    };
  }

  static get mockCity(): City {
    return {id: 1, name: 'MILANO', zoneId: 'Europe/Rome'};
  }

  static get mockGym(): Gym {
    return {
      address: 'address',
      city: TestConstants.mockCity,
      id: 1,
      name: 'gym',
      latitude: 45.0,
      longitude: 10.0
    };
  }

  static get mockAsset(): Asset {
    return {
      gym: TestConstants.mockGym,
      id: 1,
      kind: {id: 1, maxReservationTime: 30, name: 'PRESSA'},
      name: 'pressa1'
    };
  }

  static get mockReservations(): Reservation[] {
    return Array.from(new Array(10).keys()).map<Reservation>(key => ({
      asset: TestConstants.mockAsset,
      end: key < 5 ? '2019-06-10T10:20:00+0200' : '2019-06-10T11:20:00+0200',
      start: key < 5 ? '2019-06-10T10:00:00+0200' : '2019-06-11T10:00:00+0200',
      id: key + 1,
      user: TestConstants.mockUser
    }));
  }

  static get mockTimetable(): Timetable {
    return {
      closingDays: [],
      gym: TestConstants.mockGym,
      openings: []
    };
  }
}
