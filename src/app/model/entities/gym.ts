import {City} from './city';

export interface Gym {
  id: number;
  name: string;
  address: string;
  city: City;
  latitude: number;
  longitude: number;
}
