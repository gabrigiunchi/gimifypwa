import {User} from './model/entities/user';

export class TestConstants {
  static readonly mockUser: User = {
    email: 'gabri@gmail.com',
    id: 1,
    name: 'Gabriele',
    surname: 'Giunchi',
    username: 'gabrigiunchi',
    notificationsEnabled: true
  };
}
