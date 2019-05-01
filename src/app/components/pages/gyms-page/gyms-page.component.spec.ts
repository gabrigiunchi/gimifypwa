import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GymsPageComponent} from './gyms-page.component';
import {MatListModule, MatProgressSpinnerModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoadingComponent} from '../../layout/loading/loading.component';

describe('GymsPageComponent', () => {
  let component: GymsPageComponent;
  let fixture: ComponentFixture<GymsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GymsPageComponent, LoadingComponent],
      imports: [
        MatListModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        MatProgressSpinnerModule
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
