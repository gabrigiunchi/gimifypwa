import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

export enum SnackbarMessage {
  connectionError = 'Connection error',
  genericError = 'An error occurred, please try again'
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  show(message: SnackbarMessage | string, action = '', duration = 2000): void {
    this.snackBar.open(message, action, {duration: duration});
  }
}
