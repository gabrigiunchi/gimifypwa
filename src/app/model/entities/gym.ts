import {City} from './city';

export interface Gym {
    id: number;
    name: string;
    address: string;
    zoneId: string;
    city: City;
}
