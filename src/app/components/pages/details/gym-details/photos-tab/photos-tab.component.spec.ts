import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PhotosTabComponent} from './photos-tab.component';
import {MatGridListModule, MatProgressSpinnerModule} from '@angular/material';
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
  let spyOnGetMetadata: jasmine.Spy;
  let spyOnGetPhoto: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosTabComponent, DataUrlPipe, SafeUrlPipe],
      imports: [
        MatGridListModule,
        HttpClientTestingModule,
        ScrollingModule,
        MatProgressSpinnerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const gymImageService: GymImageService = TestBed.get(GymImageService);
    spyOnGetMetadata = spyOn(gymImageService, 'getPhotoMetadataOfGym').and.returnValue(of(TestConstants.mockImageMetadata));
    spyOnGetPhoto = spyOn(gymImageService, 'getPhotoOfGym').and.returnValue(of(''));
    fixture = TestBed.createComponent(PhotosTabComponent);
    component = fixture.componentInstance;
    component.gym = TestConstants.mockGym;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnChanges();
    expect(spyOnGetMetadata).toHaveBeenCalled();
  });

  it('should download the photos of the gym', async(() => {
    component.ngOnChanges();
    component.photos$.subscribe(() => {
      expect(spyOnGetPhoto).toHaveBeenCalledTimes(TestConstants.mockImageMetadata.length);
    });
  }));
});
