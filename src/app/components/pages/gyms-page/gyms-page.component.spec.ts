import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GymsPageComponent} from './gyms-page.component';
import {MatListModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

describe('GymsPageComponent', () => {
  let component: GymsPageComponent;
  let fixture: ComponentFixture<GymsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GymsPageComponent],
      imports: [
        MatListModule,
        RouterModule.forRoot([]),
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
