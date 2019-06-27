import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DateTime, Duration} from 'luxon';
import {CONSTANTS} from 'src/app/constants';

@Component({
  selector: 'app-time-period-picker',
  templateUrl: './time-period-picker.component.html',
  styleUrls: ['./time-period-picker.component.css']
})
export class TimePeriodPickerComponent {
  @Input() min = CONSTANTS.NEW_RESERVATION_MIN_TIME;
  @Input() max = CONSTANTS.NEW_RESERVATION_MAX_TIME;
  @Input() maxDuration;
  @Input() currentDate: string;
  @Input() start = '10:00';
  @Input() end = '10:30';
  @Output() startChange = new EventEmitter<string>();
  @Output() endChange = new EventEmitter<string>();
  @Input() step = CONSTANTS.RESERVATION_TIME_SLOT_IN_MINUTES;

  startSet(start: string): void {
    this.start = start;
    if (DateTime.fromFormat(start, 'HH:mm') >= DateTime.fromFormat(this.end, 'HH:mm')) {
      this.endSet(DateTime.fromFormat(start, 'HH:mm').plus({minutes: this.step}).toFormat('HH:mm'));
    }

    this.startChange.emit(start);
  }

  endSet(end: string): void {
    this.end = end;
    this.endChange.emit(end);
  }

  get isValid(): boolean {
    const start = DateTime.fromISO(this.start);
    const end = DateTime.fromISO(this.end);
    const min = DateTime.fromISO(this.min);
    const max = DateTime.fromISO(this.max);

    return min <= start && start < end && end <= max && Duration.fromMillis(end.toMillis() - start.toMillis()) <= this.maxDuration;
  }
}
