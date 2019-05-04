import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SelectLocationComponent, SelectLocationResult} from '../../modals/dialogs/select-location/select-location.component';
import {Duration} from 'luxon';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  start = '16:20';
  end = '16:21';
  max = Duration.fromObject({minutes: 20});

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }


  openDialog() {
    const dialogData: SelectLocationResult = {
      city: {id: 1, name: 'MILANO'},
      gym: {name: 'gym1', city: {id: 1, name: 'MILANO'}, address: 'Via1', id: 12, zoneId: 'Europe/Rome'}
    };
    this.dialog.open(SelectLocationComponent, {
      minWidth: '100%',
      height: '100%',
      autoFocus: false,
      restoreFocus: false,
      data: dialogData
    })
    .afterClosed().subscribe((result: SelectLocationResult) => {
      console.log(result);
    });
  }
}
