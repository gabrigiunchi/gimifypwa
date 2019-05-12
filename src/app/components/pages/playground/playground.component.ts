import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AssetListDialogData} from '../../modals/dialogs/asset-list-dialog/asset-list-dialog.component';
import {TestConstants} from 'src/app/test-constants';
import {ErrorDialogComponent} from '../../modals/dialogs/error-dialog/error-dialog.component';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  minDate = DateTime.local().toISODate();
  maxDate = DateTime.local().plus({days: 14}).toISODate();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  open() {
    const data: AssetListDialogData = {
      assets: new Array(100).fill(TestConstants.mockAsset),
      date: '2019-05-20',
      from: '10:00',
      to: '10:20'
    };
    this.dialog.open(ErrorDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      minWidth: '100%',
      height: '100%',
      data: 'ciao'
    });
  }

}
