import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnChanges {

  @Input() width = '100%';
  @Input() iconVisible = true;
  @Input() value = '';
  @Input() placeholder = 'search';
  @Input() debounceTime = 100;
  @Output() valueChange = new EventEmitter<string>();

  searchFormControl = new FormControl();

  constructor() {
    this.searchFormControl.valueChanges.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
    ).subscribe(newValue => this.updateValue(newValue));
  }

  ngOnChanges(): void {
    if (this.searchFormControl) {
      this.searchFormControl.patchValue(this.value);
    }
  }

  clear(): void {
    this.searchFormControl.patchValue('');
    this.updateValue('');
  }

  private updateValue(newValue: string): void {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }

}
