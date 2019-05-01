import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationsPageComponent} from './reservations-page.component';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('ReservationsPageComponent', () => {
  let component: ReservationsPageComponent;
  let fixture: ComponentFixture<ReservationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsPageComponent],
      imports: [
        MatListModule,
        RouterModule.forRoot([]),
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
