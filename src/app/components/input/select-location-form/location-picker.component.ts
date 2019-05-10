import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  SelectLocationComponent,
  SelectLocationInput,
  SelectLocationResult,
  SelectLocationStep
} from '../../modals/dialogs/select-location/select-location.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent {

  @Input() result: SelectLocationResult = {city: undefined, gym: undefined};
  @Output() resultChange = new EventEmitter<SelectLocationResult>();

  constructor(private dialog: MatDialog) {}

  changeCity() {
    this.openDialog({city: this.result.city, gym: undefined, step: SelectLocationStep.city});
  }

  changeGym() {
    this.openDialog({city: this.result.city, gym: this.result.gym, step: SelectLocationStep.gym});
  }

  get isValid(): boolean {
    return !!this.result;
  }

  private openDialog(data: SelectLocationInput): void {
    this.dialog.open(SelectLocationComponent, {
      minWidth: '100%',
      height: '100%',
      autoFocus: false,
      restoreFocus: false,
      data: data,
    }).afterClosed().subscribe((result: SelectLocationResult) => {
      if (result) {
        console.log('Selected location:', result);
        this.result = result;
        this.resultChange.emit(this.result);
      }
    });
  }
}
