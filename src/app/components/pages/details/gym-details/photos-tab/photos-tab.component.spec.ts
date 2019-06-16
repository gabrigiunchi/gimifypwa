import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PhotosTabComponent} from './photos-tab.component';
import {MatGridListModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';
import {GymImageService} from 'src/app/services/server-communication/gym-image-service';
import {of} from 'rxjs';
import {TestConstants} from 'src/app/test-constants';

describe('PhotosTabComponent', () => {
  let component: PhotosTabComponent;
  let fixture: ComponentFixture<PhotosTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosTabComponent, DataUrlPipe, SafeUrlPipe],
      imports: [
        MatGridListModule,
        HttpClientTestingModule,
        ScrollingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(GymImageService), 'getPhotoMetadataOfGym').and.returnValue(of([]));
    fixture = TestBed.createComponent(PhotosTabComponent);
    component = fixture.componentInstance;
    component.gym = TestConstants.mockGym;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
