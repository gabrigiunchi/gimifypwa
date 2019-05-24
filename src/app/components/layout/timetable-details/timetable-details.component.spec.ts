import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimetableDetailsComponent} from './timetable-details.component';
import {MatTableModule} from '@angular/material';
import {TimePipe} from 'src/app/pipes/date/time.pipe';
import {GroupIntervalsByDayOfWeekPipe} from 'src/app/pipes/group-intervals-by-day-of-week.pipe';
import {DayOfWeekNamePipe} from 'src/app/pipes/date/day-of-week-name.pipe';

describe('TimetableDetailsComponent', () => {
  let component: TimetableDetailsComponent;
  let fixture: ComponentFixture<TimetableDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimetableDetailsComponent,
        TimePipe,
        GroupIntervalsByDayOfWeekPipe,
        DayOfWeekNamePipe
      ],
      imports: [
        MatTableModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
