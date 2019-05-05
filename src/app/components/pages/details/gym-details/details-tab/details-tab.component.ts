import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Gym} from 'src/app/model/entities/gym';
import {Timetable} from 'src/app/model/entities/timetable';
import {TimetableService} from 'src/app/services/server-communication/timetable.service';

@Component({
  selector: 'app-details-tab',
  templateUrl: './details-tab.component.html',
  styleUrls: ['./details-tab.component.css']
})
export class DetailsTabComponent implements OnChanges {

  @Input() gym: Gym;
  timetable$: Observable<Timetable>;

  constructor(private timetableService: TimetableService) {}

  ngOnChanges() {
    if (this.gym) {
      this.timetable$ = this.timetableService.getTimetableOfGym(this.gym);
    }
  }

}
