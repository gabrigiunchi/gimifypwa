import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DetailsTabComponent} from './details-tab.component';
import {TimetableDetailsComponent} from 'src/app/components/layout/timetable-details/timetable-details.component';
import {MatIconModule, MatListModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import {TimePipe} from 'src/app/pipes/date/time.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {MapComponent} from 'src/app/components/layout/map/map.component';
import {RouterModule} from '@angular/router';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {AgmCoreModule} from '@agm/core';
import {GroupIntervalsByDayOfWeekPipe} from 'src/app/pipes/group-intervals-by-day-of-week.pipe';
import {DayOfWeekNamePipe} from 'src/app/pipes/date/day-of-week-name.pipe';
import {TimetableService} from 'src/app/services/server-communication/timetable.service';
import {of} from 'rxjs';
import {TestConstants} from 'src/app/test-constants';

describe('DetailsTabComponent', () => {
  let component: DetailsTabComponent;
  let fixture: ComponentFixture<DetailsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsTabComponent,
        TimetableDetailsComponent,
        LoadingComponent,
        MapComponent,
        TimePipe,
        GroupIntervalsByDayOfWeekPipe,
        DayOfWeekNamePipe
      ],
      imports: [
        MatTableModule,
        MatListModule,
        MatIconModule,
        ScrollingModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBiClW-tzn_XUpFDNs6c5PjwGtE61xaW6A'
        }),
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(TimetableService), 'getTimetableOfGym').and.returnValue(of(TestConstants.mockTimetable));
    fixture = TestBed.createComponent(DetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
