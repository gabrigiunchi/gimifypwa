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
    this.dialog.open(SelectLocationComponent, {
      minWidth: '100%',
      height: '100%',
      autoFocus: false,
      restoreFocus: false,
    })
    .afterClosed().subscribe((result: SelectLocationResult) => {
      console.log(result);
    });
  }
}
