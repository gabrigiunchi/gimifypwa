import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material';
import {DateTime} from 'luxon';
import {CONSTANTS} from 'src/app/constants';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent {

  @Input() date = DateTime.local().toISODate();
  @Output() dateChange = new EventEmitter<string>();
  @Input() min = DateTime.local().toISODate();
  @Input() max = DateTime.local().plus(CONSTANTS.RESERVATION_THRESHOLD).toISODate();

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.date = DateTime.fromISO(event.value.toISOString()).toISODate();
    this.dateChange.emit(this.date);
  }
}
