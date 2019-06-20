import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GymListComponent} from './gym-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDividerModule, MatIconModule, MatListModule} from '@angular/material';
import {GymAvatarPipe} from 'src/app/pipes/gym-avatar.pipe';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AvatarModule} from 'ngx-avatar';
import {TestConstants} from 'src/app/test-constants';
import {of} from 'rxjs';
import {GymImageService} from 'src/app/services/server-communication/gym-image-service';

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
        AvatarModule,
        MatIconModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(GymImageService), 'getAvatarMetadataOfGym').and.returnValue(of([]));
    spyOn(TestBed.get(GymImageService), 'getPhotoOfGym').and.returnValue(of(''));
    fixture = TestBed.createComponent(GymListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a gym', () => {
    const spy = spyOn(component.gymClick, 'emit').and.callThrough();
    const gym = TestConstants.mockGym;
    component.onGymClick(gym);
    expect(spy).toHaveBeenCalledWith(gym);
  });
});
