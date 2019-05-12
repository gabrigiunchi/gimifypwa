import {Component} from '@angular/core';
import {SettingsService} from 'src/app/services/settings.service';
import {MatDialog} from '@angular/material';
import {City} from 'src/app/model/entities/city';
import {SelectCityDialogComponent} from '../../modals/dialogs/select-city-dialog/select-city-dialog.component';

@Component({
  selector: 'app-default-city-picker',
  templateUrl: './default-city-picker.component.html',
  styleUrls: ['./default-city-picker.component.css']
})
export class DefaultCityPickerComponent {

  city: City;

  constructor(private settingsService: SettingsService, private dialog: MatDialog) {
    this.city = this.settingsService.defaultCity;
  }

  pickCity() {
    this.dialog.open(SelectCityDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      height: '100%',
      minWidth: '100%'
    })
      .afterClosed()
      .subscribe((result: City) => {
        if (result) {
          console.log('Set default city', result);
          this.city = result;
          this.settingsService.defaultCity = result;
        }
      });
  }
}
