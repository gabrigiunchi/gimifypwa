import {Component, OnInit} from '@angular/core';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {Gym} from 'src/app/model/entities/gym';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-gyms-page',
  templateUrl: './gyms-page.component.html',
  styleUrls: ['./gyms-page.component.css']
})
export class GymsPageComponent implements OnInit {

  gyms$: Observable<Gym[]>;

  constructor(private gymService: GymService) {}

  ngOnInit() {
    this.gyms$ = this.gymService.gyms;
  }

}
