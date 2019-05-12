import {Component, OnInit, OnDestroy} from '@angular/core';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Gym} from 'src/app/model/entities/gym';
import {CacheService} from 'src/app/services/cache.service';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.css']
})
export class GymDetailsComponent implements OnInit, OnDestroy {

  gym: Gym;
  rating$: Observable<number>;
  clearCache = true;

  constructor(
    private cacheService: CacheService<Gym[]>,
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
    this.clearCache = false;
    this.router.navigate(['/gyms']);
  }

  ngOnDestroy() {
    if (this.clearCache) {
      this.cacheService.clear();
    }
  }

}
