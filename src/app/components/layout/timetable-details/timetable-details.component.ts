import {Component, Input} from '@angular/core';
import {Timetable} from 'src/app/model/entities/timetable';
import {RepeatedInterval} from 'src/app/model/entities/repeated-interval';

@Component({
  selector: 'app-timetable-details',
  templateUrl: './timetable-details.component.html',
  styleUrls: ['./timetable-details.component.css']
})
export class TimetableDetailsComponent {

  displayedColumns: string[] = ['day', 'schedule'];
  @Input() timetable: Timetable;

  get source(): RepeatedInterval[] {
    return this.timetable.openings;
  }
}
