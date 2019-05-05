import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GymDetailsComponent} from './gym-details.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RatingBarComponent} from 'src/app/components/layout/rating-bar/rating-bar.component';
import {MatIconModule} from '@angular/material';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {of} from 'rxjs';
import {Gym} from 'src/app/model/entities/gym';

describe('GymDetailsComponent', () => {
  let component: GymDetailsComponent;
  let fixture: ComponentFixture<GymDetailsComponent>;

  const mockGym: Gym = {
    id: 1,
    address: '',
    city: {id: 1, name: 'MILANO'},
    name: '',
    zoneId: 'Europe/Rome'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GymDetailsComponent, RatingBarComponent],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const gymService: GymService = TestBed.get(GymService);
    spyOn(gymService, 'getRatingOfGym').and.returnValue(of(1));
    spyOn(gymService, 'getGymById').and.returnValue(of(mockGym));
    fixture = TestBed.createComponent(GymDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
