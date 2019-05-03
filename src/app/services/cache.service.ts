import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService<T> {

  element: T;

  clear(): void {
    this.element = undefined;
  }

  get isPresent(): boolean {
    return this.element !== undefined;
  }
}
