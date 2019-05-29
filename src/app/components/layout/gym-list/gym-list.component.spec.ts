import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GymListComponent} from './gym-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDividerModule, MatIconModule, MatListModule} from '@angular/material';
import {GymAvatarPipe} from 'src/app/pipes/gym-avatar.pipe';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GymListComponent', () => {
  let component: GymListComponent;
  let fixture: ComponentFixture<GymListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GymListComponent, GymAvatarPipe, SafeUrlPipe],
      imports: [
        ScrollingModule,
        MatListModule,
        MatDividerModule,
        MatIconModule,
        HttpClientTestingModule
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
