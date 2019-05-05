import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailsTabComponent} from './details-tab.component';
import {TimetableDetailsComponent} from 'src/app/components/layout/timetable-details/timetable-details.component';
import {MatTableModule} from '@angular/material';
import {TimePipe} from 'src/app/pipes/date/time.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DetailsTabComponent', () => {
  let component: DetailsTabComponent;
  let fixture: ComponentFixture<DetailsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsTabComponent,
        TimetableDetailsComponent,
        TimePipe
      ],
      imports: [
        MatTableModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});