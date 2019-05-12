import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CityService} from 'src/app/services/server-communication/city.service';
import {City} from 'src/app/model/entities/city';
import {SelectionDialogComponent, SelectionDialogData} from '../dialogs/selection-dialog/selection-dialog.component';
import {TitleCasePipe} from '@angular/common';

export interface GymFilterResult {
  city: City;
  ratingGreaterThan: number;
}

@Component({
  selector: 'app-gym-filter',
  templateUrl: './gym-filter.component.html',
  styleUrls: ['./gym-filter.component.css']
})
export class GymFilterComponent implements OnInit {

  cities: City[];
  result: GymFilterResult = {city: undefined, ratingGreaterThan: 0};

  constructor(
    private dialog: MatDialog,
    private cityService: CityService,
    private dialogRef: MatDialogRef<GymFilterComponent>) {
  }

  ngOnInit() {
    this.cityService.cities.subscribe(c => this.cities = c);
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.result);
  }

  pickCity() {
    const dialogData: SelectionDialogData = {
      choices: this.cities,
      title: 'Select city',
      toStringFunction: (city: City) => new TitleCasePipe().transform(city.name)
    };
    this.dialog.open(SelectionDialogComponent, {
      restoreFocus: false,
      autoFocus: false,
      data: dialogData,
      minWidth: '100%',
      height: '100%'
    }).afterClosed().subscribe((result: City) => {
      if (result) {
        this.result.city = result;
      }
    });
  }
}
