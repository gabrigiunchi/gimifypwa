import {Component, OnInit} from '@angular/core';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Reservation} from 'src/app/model/entities/reservation';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from 'src/app/components/modals/dialogs/confirmation-dialog/confirmation-dialog.component';
import {finalize} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorDialogComponent} from 'src/app/components/modals/dialogs/error-dialog/error-dialog.component';
import {DateTime} from 'luxon';
import {CONSTANTS} from 'src/app/constants';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {

  readonly gymIcon = CONSTANTS.GYM_ICON;
  reservation$: Observable<Reservation>;
  isDeleting = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.reservation$ = this.reservationService.getMyReservationById(id);
  }

  onDeleteClick(reservation: Reservation) {
    const dialogData = ConfirmationDialogComponent.DEFAULT_DATA;
    dialogData.title = 'Delete reservation';
    dialogData.message = 'Do you want to delete the reservation?';
    this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: dialogData
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteReservation(reservation);
      }
    });
  }

  canDelete(reservation: Reservation): boolean {
    const zoneId = reservation.asset.gym.city.zoneId;
    return DateTime.local().setZone(zoneId).plus(CONSTANTS.RESERVATION_CANCELLATION_LIMIT) <
      DateTime.fromISO(reservation.start, {zone: zoneId});
  }

  deleteReservation(reservation: Reservation) {
    this.isDeleting = true;
    this.reservationService.deleteMyReservation(reservation)
      .pipe(finalize(() => this.isDeleting = false))
      .subscribe(
        () => this.router.navigate(['/reservations']),
        error => this.handleError(error));
  }

  private handleError(error: HttpErrorResponse) {
    this.dialog.open(ErrorDialogComponent, {data: error, autoFocus: false, restoreFocus: false});
  }

}
