import {Component, OnInit} from '@angular/core';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Gym} from 'src/app/model/entities/gym';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.css']
})
export class GymDetailsComponent implements OnInit {

  gym: Gym;
  rating$: Observable<number>;

  constructor(
    private router: Router,
    private gymService: GymService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.gymService.getGymById(id).subscribe(gym => this.gym = gym);
    this.rating$ = this.gymService.getRatingOfGym(id);
  }

  back() {
    this.router.navigate(['/gyms']);
  }

}
