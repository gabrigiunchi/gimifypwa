import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Duration} from 'luxon';
import {GymFilterComponent, GymFilterResult} from '../../modals/gym-filter/gym-filter.component';
import {Observable} from 'rxjs';
import {Asset} from 'src/app/model/entities/asset';

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

}
