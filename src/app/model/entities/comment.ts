import {User} from './user';

export interface Comment {
    id: number;
    user: User;
    gymId: number;
    title: string;
    message: string;
    rating: number;
    date: string;
}
