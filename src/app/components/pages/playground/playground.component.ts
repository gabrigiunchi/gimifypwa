import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewCommentDialogComponent} from '../../modals/dialogs/new-comment-dialog/new-comment-dialog.component';

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
    this.dialog.open(NewCommentDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      minWidth: '100%',
      height: '100%',
      data: {id: 1}
    });
  }

}
