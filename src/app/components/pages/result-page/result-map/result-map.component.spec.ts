import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultMapComponent} from './result-map.component';
import {AgmCoreModule} from '@agm/core';

describe('ResultMapComponent', () => {
  let component: ResultMapComponent;
  let fixture: ComponentFixture<ResultMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultMapComponent],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBiClW-tzn_XUpFDNs6c5PjwGtE61xaW6A'
        }),
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
