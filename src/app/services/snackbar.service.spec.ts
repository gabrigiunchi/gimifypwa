import {TestBed} from '@angular/core/testing';

import {SnackbarService} from './snackbar.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';

describe('SnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatSnackBarModule]
  }));

  it('should be created', () => {
    const service: SnackbarService = TestBed.get(SnackbarService);
    expect(service).toBeTruthy();
  });

  it('should show a message', () => {
    const service: SnackbarService = TestBed.get(SnackbarService);
    const spy = spyOn(TestBed.get(MatSnackBar), 'open').and.callFake(() => {});
    service.show('ciao');
    expect(spy).toHaveBeenCalledWith('ciao', '', {duration: 2000});
  });

  it('should show a message and an action', () => {
    const service: SnackbarService = TestBed.get(SnackbarService);
    const spy = spyOn(TestBed.get(MatSnackBar), 'open').and.callFake(() => {});
    service.show('ciao', 'action');
    expect(spy).toHaveBeenCalledWith('ciao', 'action', {duration: 2000});
  });

  it('should show a message, an action and a duration', () => {
    const service: SnackbarService = TestBed.get(SnackbarService);
    const spy = spyOn(TestBed.get(MatSnackBar), 'open').and.callFake(() => {});
    service.show('ciao', 'action', 1000);
    expect(spy).toHaveBeenCalledWith('ciao', 'action', {duration: 1000});
  });
});
