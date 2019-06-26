import {async, TestBed} from '@angular/core/testing';
import {ImageService} from './image.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UrlService} from '../url.service';
import {of, throwError} from 'rxjs';
import {TestConstants} from 'src/app/test-constants';
import {HttpClient} from '@angular/common/http';
import {FileSaverService} from '../file-saver.service';
import {CONSTANTS} from 'src/app/constants';
import {SessionService} from '../session.service';

describe('ImageService', () => {

  let imageService: ImageService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    imageService = TestBed.get(ImageService);
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeaderForImages', 'get').and.returnValue({});
  });

  it('should be created', () => {
    expect(imageService).toBeTruthy();
  });

  it('should download an image and save it into cache', async(() => {
    const url = 'image1.png';
    const metadata = TestConstants.mockImageMetadata[0];
    const spyOnDownload = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.str2ab('image')));
    const spyOnCaching = spyOn(TestBed.get(FileSaverService), 'saveImage').and.returnValue(of({}));
    const spyOnCachingMetadata = spyOn(TestBed.get(SessionService), 'saveMetadata').and.callFake(() => {});
    imageService.getPhoto(metadata, url).subscribe(() => {
      expect(spyOnDownload).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}image1.png`, {});
      expect(spyOnCaching).toHaveBeenCalled();
      expect(spyOnCachingMetadata).toHaveBeenCalled();
    });
  }));

  it('should download an image and not save it into cache', async(() => {
    const url = 'image1.png';
    const metadata = TestConstants.mockImageMetadata[0];
    const spyOnDownload = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.str2ab('image')));
    const spyOnCaching = spyOn(TestBed.get(FileSaverService), 'saveImage').and.returnValue(of({}));
    imageService.getPhoto(metadata, url, false).subscribe(() => {
      expect(spyOnDownload).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}image1.png`, {});
      expect(spyOnCaching).not.toHaveBeenCalled();
    });
  }));

  it('should handle errors raised when saving the image', async(() => {
    const url = 'image1.png';
    const metadata = TestConstants.mockImageMetadata[0];
    const spyOnDownload = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.str2ab('image')));
    const spyOnCaching = spyOn(TestBed.get(FileSaverService), 'saveImage').and.returnValue(throwError('could not save image'));
    const spyOnCachingMetadata = spyOn(TestBed.get(SessionService), 'saveMetadata').and.callFake(() => {});
    imageService.getPhoto(metadata, url).subscribe(() => {
      expect(spyOnDownload).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}image1.png`, {});
      expect(spyOnCaching).toHaveBeenCalled();
      expect(spyOnCachingMetadata).not.toHaveBeenCalled();
    });
  }));
});
