import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/internal/Subscription';
import {ErrorStateMatcher} from '@angular/material';
import {DateTime} from 'luxon';

export class DateErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

function dateValidator(min: string, max: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const date = DateTime.fromISO(control.value);
    return date < DateTime.fromISO(min) || date > DateTime.fromISO(max) ?
      {'forbidden date': {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() date = DateTime.local().toISODate();
  @Output() dateChange = new EventEmitter<string>();
  @Input() min = '1980-01-01';
  @Input() max = '3000-12-31';
  @Output() validChange = new EventEmitter<boolean>();
  @Input() width = '';
  @Input() placeholder = '';

  form: FormGroup;
  errorStateMatcher = new DateErrorStateMatcher();

  private subscription: Subscription;
  @ViewChild('datepicker') private input: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.form = new FormGroup({
      'date': new FormControl(this.date, [Validators.required, dateValidator(this.min, this.max)])
    });

    this.validChange.emit(this.form.valid);
    this.subscription = this.form.valueChanges.subscribe(e => {
      this.dateChange.emit(e.date);
      this.validChange.emit(this.form.valid);
    });
  }

  ngOnChanges(): void {
    if (this.form) {
      this.form.patchValue({date: this.date});
      const formControl = this.form.get('date');
      formControl.setValidators([Validators.required, dateValidator(this.min, this.max)]);
      formControl.updateValueAndValidity();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  click(): void {
    this.input.nativeElement.click();
  }
}
