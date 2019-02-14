import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  getRestUrl(suffix: string): string {
    return CONSTANTS.BASE_URL + suffix;
  }
}
