import {Component, OnInit} from '@angular/core';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Gym} from 'src/app/model/entities/gym';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.css']
})
export class GymDetailsComponent implements OnInit {

  gym$: Observable<Gym>;
  rating$: Observable<number>;

  constructor(private gymService: GymService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.gym$ = this.gymService.getGymById(id);
    this.rating$ = this.gymService.getRatingOfGym(id);
  }

}
