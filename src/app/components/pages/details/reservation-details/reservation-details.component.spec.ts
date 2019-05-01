import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationDetailsComponent} from './reservation-details.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

describe('ReservationDetailsComponent', () => {
  let component: ReservationDetailsComponent;
  let fixture: ComponentFixture<ReservationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationDetailsComponent],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
