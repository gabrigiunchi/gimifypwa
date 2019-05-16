import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Gym} from 'src/app/model/entities/gym';

@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.css']
})
export class GymListComponent {

  @Input() gyms: Gym[];
  @Output() gymClick = new EventEmitter<Gym>();

  onGymClick(gym: Gym) {
    this.gymClick.emit(gym);
  }

}
