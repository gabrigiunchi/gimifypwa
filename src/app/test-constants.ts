import {User} from './model/entities/user';
import {Gym} from './model/entities/gym';
import {Asset} from './model/entities/asset';
import {Reservation} from './model/entities/reservation';

export class TestConstants {
  static readonly mockUser: User = {
    email: 'gabri@gmail.com',
    id: 1,
    name: 'Gabriele',
    surname: 'Giunchi',
    username: 'gabrigiunchi',
    notificationsEnabled: true
  };

  static readonly mockGym: Gym = {
    address: 'address',
    city: {id: 1, name: 'MILANO'},
    id: 1,
    name: 'gym',
    latitude: 45.0,
    longitude: 10.0
  };

  static readonly mockAsset: Asset = {
    gym: TestConstants.mockGym,
    id: 1,
    kind: {id: 1, maxReservationTime: 30, name: 'PRESSA'},
    name: 'pressa1'
  };

  static readonly mockReservations: Reservation[] = Array.from(new Array(10).keys()).map<Reservation>(key => ({
    asset: TestConstants.mockAsset,
    end: key < 5 ? '2019-06-10T10:20:00+0200' : '2019-06-10T11:20:00+0200',
    start: key < 5 ? '2019-06-10T10:00:00+0200' : '2019-06-11T10:00:00+0200',
    id: key + 1,
    user: TestConstants.mockUser
  }));
}
