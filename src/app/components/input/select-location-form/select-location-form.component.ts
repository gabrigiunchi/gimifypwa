import {Component, Input, Output, EventEmitter} from '@angular/core';
import {
  SelectLocationResult,
  SelectLocationComponent,
  SelectLocationInput,
  SelectLocatioStep
} from '../../modals/dialogs/select-location/select-location.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-select-location-form',
  templateUrl: './select-location-form.component.html',
  styleUrls: ['./select-location-form.component.css']
})
export class SelectLocationFormComponent {

  @Input() result: SelectLocationResult = {city: undefined, gym: undefined};
  @Output() resultChange = new EventEmitter<SelectLocationResult>();

  constructor(private dialog: MatDialog) {}

  changeCity() {
    this.openDialog({city: this.result.city, gym: undefined, step: SelectLocatioStep.city});
  }

  changeGym() {
    this.openDialog({city: this.result.city, gym: this.result.gym, step: SelectLocatioStep.gym});
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
