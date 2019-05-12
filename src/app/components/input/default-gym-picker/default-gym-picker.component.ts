import {Component} from '@angular/core';
import {SettingsService} from 'src/app/services/settings.service';
import {MatDialog} from '@angular/material';
import {
  SelectLocationComponent,
  SelectLocationResult,
  SelectLocationInput,
  SelectLocationStep
} from '../../modals/dialogs/select-location/select-location.component';
import {Gym} from 'src/app/model/entities/gym';

@Component({
  selector: 'app-default-gym-picker',
  templateUrl: './default-gym-picker.component.html',
  styleUrls: ['./default-gym-picker.component.css']
})
export class DefaultGymPickerComponent {

  gym: Gym;

  constructor(private settingsService: SettingsService, private dialog: MatDialog) {
    this.gym = this.settingsService.defaultGym;
  }

  pickGym() {
    const dialogData: SelectLocationInput = {city: undefined, gym: undefined, step: SelectLocationStep.city, anyValid: false};
    this.dialog.open(SelectLocationComponent, {
      autoFocus: false,
      restoreFocus: false,
      height: '100%',
      minWidth: '100%',
      data: dialogData
    })
      .afterClosed()
      .subscribe((result: SelectLocationResult) => {
        if (result) {
          console.log('Set default gym', result.gym);
          this.gym = result.gym;
          this.settingsService.defaultCity = result.gym;
        }
      });
  }
}
