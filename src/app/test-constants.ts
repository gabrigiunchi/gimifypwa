import {User} from './model/entities/user';
import {Gym} from './model/entities/gym';
import {Asset} from './model/entities/asset';

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
    city: {id: 1, name:  'MILANO'},
    id: 1,
    name: 'gym',
    zoneId: 'Europe/Rome',
    latitude: 45.0,
    longitude: 10.0
  };

  static readonly mockAsset: Asset = {
    gym: TestConstants.mockGym,
    id: 1,
    kind: {id: 1, maxReservationTime: 30, name: 'PRESSA'},
    name: 'pressa1'
  };
}
