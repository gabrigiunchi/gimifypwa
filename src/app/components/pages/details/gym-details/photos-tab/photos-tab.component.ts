import {Component, Input, OnChanges} from '@angular/core';
import {Gym} from 'src/app/model/entities/gym';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.css']
})
export class PhotosTabComponent implements OnChanges {

  @Input() gym: Gym;
  photos$: Observable<string[]>;

  constructor(private gymService: GymService) {}

  ngOnChanges() {
    if (this.gym) {
      this.photos$ = this.gymService.getPhotosOfGym(this.gym);
    }
  }

}
