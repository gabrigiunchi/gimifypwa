import {TestBed} from '@angular/core/testing';
import {GymImageService} from './gym-image-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SessionService} from '../session.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {FileSaverService} from '../file-saver.service';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';
import {UrlService} from '../url.service';
import {TestConstants} from 'src/app/test-constants';
import {CONSTANTS} from 'src/app/constants';

describe('GymImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  let service: GymImageService;
  let sessionService: SessionService;
  let fileSaverService: FileSaverService;

  beforeEach(() => {
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeader', 'get').and.returnValue({});
    service = TestBed.get(GymImageService);
    sessionService = TestBed.get(SessionService);
    sessionService.clear();
    fileSaverService = TestBed.get(FileSaverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the image from cache if the metadata are updated', () => {
    spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of('aaa'));
    const metadata: ImageMetadata = {id: 'image1', lastModified: 1};
    sessionService.saveMetadata(metadata);
    const spyOnSaveImage = spyOn(fileSaverService, 'saveImage').and.callFake(() => {});
    const spyOnLoadImage = spyOn(fileSaverService, 'loadFile').and.returnValue('');
    const spyOnSaveMetadata = spyOn(sessionService, 'saveMetadata').and.callThrough();

    service.getPhotoOfGym(metadata);

    expect(spyOnSaveImage).not.toHaveBeenCalled();
    expect(spyOnSaveMetadata).not.toHaveBeenCalled();
    expect(spyOnLoadImage).toHaveBeenCalled();
  });

  it('should download the updated image from cache if the metadata are NOT updated', () => {
    spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of('aaa'));
    const metadata: ImageMetadata = {id: 'image1', lastModified: 1};
    sessionService.saveMetadata(metadata);
    const spyOnSaveImage = spyOn(fileSaverService, 'saveImage').and.returnValue(of({}));
    const spyOnLoadImage = spyOn(fileSaverService, 'loadFile').and.returnValue('');
    const spyOnSaveMetadata = spyOn(sessionService, 'saveMetadata').and.callThrough();

    service.getPhotoOfGym({id: 'image1', lastModified: 2}).subscribe();

    expect(spyOnSaveImage).toHaveBeenCalled();
    expect(spyOnSaveMetadata).toHaveBeenCalled();
    expect(spyOnLoadImage).not.toHaveBeenCalled();
  });

  it('should download the updated image from cache if the metadata are NOT present', () => {
    spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of('aaa'));
    expect(localStorage.getItem('image1')).toBe(null);
    const spyOnSaveImage = spyOn(fileSaverService, 'saveImage').and.returnValue(of({}));
    const spyOnLoadImage = spyOn(fileSaverService, 'loadFile').and.returnValue('');
    const spyOnSaveMetadata = spyOn(sessionService, 'saveMetadata').and.callThrough();

    service.getPhotoOfGym({id: 'image1', lastModified: 2}).subscribe();

    expect(spyOnSaveImage).toHaveBeenCalled();
    expect(spyOnSaveMetadata).toHaveBeenCalled();
    expect(spyOnLoadImage).not.toHaveBeenCalled();
  });

  it('should get the image metadata of a gym', () => {
    const gym = TestConstants.mockGym;
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of([]));
    service.getPhotoMetadataOfGym(gym);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.GYMS}/${gym.id}/photos`, {});
  });

  it('should get the avatar metadata of a gym', () => {
    const gym = TestConstants.mockGym;
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.mockImageMetadata[0]));
    service.getAvatarMetadataOfGym(gym);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.GYMS}/${gym.id}/avatar/metadata`, {});
  });
});
