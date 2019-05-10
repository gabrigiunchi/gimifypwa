import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/internal/Subscription';
import {DateTime, Duration} from 'luxon';

class StartHourErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return form.hasError('invalidStartTime');
  }
}

class EndHourErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return form.hasError('invalidEndTime') || form.hasError('invalidDuration');
  }
}

function hourValidator(min: string, maxDuration: Duration): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const s = DateTime.fromFormat(control.get('start').value, 'HH:mm');
    const e = DateTime.fromFormat(control.get('end').value, 'HH:mm');

    if (DateTime.fromFormat(min, 'HH:mm') > s) {
      return {'invalidStartTime': true};
    }

    if (s >= e) {
      return {'invalidEndTime': true};
    }

    return Duration.fromMillis(e.toMillis() - s.toMillis()) > maxDuration ? {'invalidDuration': true} : null;
  };
}

@Component({
  selector: 'app-time-period-picker',
  templateUrl: './time-period-picker.component.html',
  styleUrls: ['./time-period-picker.component.css']
})
export class TimePeriodPickerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() min = '00:00';
  @Input() start = '10:00';
  @Input() end = '10:10';
  @Input() maxDuration = Duration.fromObject({hours: 24});
  @Output() validChange = new EventEmitter<boolean>();
  @Output() startChange = new EventEmitter<string>();
  @Output() endChange = new EventEmitter<string>();

  startHourErrorMatcher: StartHourErrorMatcher;
  endHourErrorMatcher: StartHourErrorMatcher;
  form: FormGroup;
  private subscription: Subscription;

  ngOnInit(): void {
    this.startHourErrorMatcher = new StartHourErrorMatcher();
    this.endHourErrorMatcher = new EndHourErrorMatcher();

    this.form = new FormGroup({
      'start': new FormControl(this.start, [Validators.required]),
      'end': new FormControl(this.end, [Validators.required]),
    }, {validators: [this.validator]});

    this.validChange.emit(this.form.valid);
    this.subscription = this.form.valueChanges.subscribe(e => {
      this.startChange.emit(e.start);
      this.endChange.emit(e.end);
      this.validChange.emit(this.form.valid);
    });
  }

  ngOnChanges(): void {
    if (this.form) {
      this.form.patchValue({start: this.start, end: this.end});
      this.form.setValidators([this.validator]);
      this.form.updateValueAndValidity();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get isValid(): boolean {
    return this.form.valid;
  }

  private get validator(): ValidatorFn {
    return hourValidator(this.min, this.maxDuration);
  }

}
