import {Component, Input} from '@angular/core';
import {Timetable} from 'src/app/model/entities/timetable';
import {Schedule} from 'src/app/model/entities/schedule';

@Component({
  selector: 'app-timetable-details',
  templateUrl: './timetable-details.component.html',
  styleUrls: ['./timetable-details.component.css']
})
export class TimetableDetailsComponent {

  displayedColumns: string[] = ['day', 'schedule'];
  @Input() timetable: Timetable;

  get source(): Schedule[] {
    return this.timetable.openings.sort((a, b) => a.id - b.id);
  }


}
