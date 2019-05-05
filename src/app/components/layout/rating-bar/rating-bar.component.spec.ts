import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RatingBarComponent} from './rating-bar.component';
import {MatIconModule} from '@angular/material';

describe('RatingBarComponent', () => {
  let component: RatingBarComponent;
  let fixture: ComponentFixture<RatingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingBarComponent],
      imports: [MatIconModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should round down the value', () => {
    component.value = 4.5;
    expect(component.result.map(e => e === RatingBarComponent.FILL_COLOR ? 1 : 0)[4]).toBe(0);
  });
});
