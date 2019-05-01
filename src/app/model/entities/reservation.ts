import {User} from './user';
import {Asset} from './asset';

export interface Reservation {
  id: number;
  user: User;
  asset: Asset;
  start: string;
  end: string;
}
