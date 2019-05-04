import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SelectLocationComponent, SelectLocationResult} from '../../modals/dialogs/select-location/select-location.component';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

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
