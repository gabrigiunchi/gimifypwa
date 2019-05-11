import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewCommentDialogComponent} from '../../modals/dialogs/new-comment-dialog/new-comment-dialog.component';
import {AssetListDialogComponent, AssetListDialogData} from '../../modals/dialogs/asset-list-dialog/asset-list-dialog.component';
import {TestConstants} from 'src/app/test-constants';

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

  open() {
    const data: AssetListDialogData = {
      assets: new Array(100).fill(TestConstants.mockAsset),
      date: '2019-05-20',
      from: '10:00',
      to: '10:20'
    };
    this.dialog.open(AssetListDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      minWidth: '100%',
      height: '100%',
      data: data
    });
  }

}
