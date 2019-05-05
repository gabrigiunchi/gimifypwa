import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Duration} from 'luxon';
import {GymFilterComponent, GymFilterResult} from '../../modals/gym-filter/gym-filter.component';

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
    this.dialog.open(GymFilterComponent, {
      minWidth: '100%',
      height: '100%',
      autoFocus: false,
      restoreFocus: false,
    })
    .afterClosed().subscribe((result: GymFilterResult) => {
      console.log(result);
    });
  }
}
