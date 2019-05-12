import {Component, OnInit} from '@angular/core';
import {CityService} from 'src/app/services/server-communication/city.service';
import {MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {City} from 'src/app/model/entities/city';

@Component({
  selector: 'app-select-city-dialog',
  templateUrl: './select-city-dialog.component.html',
  styleUrls: ['./select-city-dialog.component.css']
})
export class SelectCityDialogComponent implements OnInit {

  cities$: Observable<City[]>;
  selected: City;

  constructor(
    private dialogRef: MatDialogRef<SelectCityDialogComponent>,
    private cityService: CityService) { }

  ngOnInit() {
    this.cities$ = this.cityService.cities;
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.selected);
  }

}
