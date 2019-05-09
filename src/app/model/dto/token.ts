import {User} from '../entities/user';

export interface Token {
  user: User;
  token: string;
}
