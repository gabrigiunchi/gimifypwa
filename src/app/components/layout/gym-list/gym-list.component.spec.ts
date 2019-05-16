import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GymListComponent} from './gym-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDividerModule, MatListModule} from '@angular/material';
import {RouterModule} from '@angular/router';

describe('GymListComponent', () => {
  let component: GymListComponent;
  let fixture: ComponentFixture<GymListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GymListComponent],
      imports: [
        ScrollingModule,
        MatListModule,
        MatDividerModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
