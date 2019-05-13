import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultMapComponent} from './result-map.component';
import {AgmCoreModule} from '@agm/core';
import {MatDialogModule, MatIconModule} from '@angular/material';
import {MapComponent} from 'src/app/components/layout/map/map.component';
import {AssetsToGymsPipe} from 'src/app/pipes/assets-to-gyms.pipe';

describe('ResultMapComponent', () => {
  let component: ResultMapComponent;
  let fixture: ComponentFixture<ResultMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultMapComponent, MapComponent, AssetsToGymsPipe],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBiClW-tzn_XUpFDNs6c5PjwGtE61xaW6A'
        }),
        MatIconModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
