import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GymFilterComponent} from './gym-filter.component';
import {MatIconModule, MatSliderModule, MatDialogModule, MatDialogRef} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GymFilterComponent', () => {
  let component: GymFilterComponent;
  let fixture: ComponentFixture<GymFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GymFilterComponent],
      imports: [
        MatIconModule,
        MatSliderModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [{provide: MatDialogRef, useValue: {}}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
