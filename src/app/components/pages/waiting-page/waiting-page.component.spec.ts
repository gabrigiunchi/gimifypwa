import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WaitingPageComponent} from './waiting-page.component';
import {MatProgressSpinnerModule} from '@angular/material';

describe('WaitingPageComponent', () => {
  let component: WaitingPageComponent;
  let fixture: ComponentFixture<WaitingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingPageComponent],
      imports: [
        MatProgressSpinnerModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
