import {TestBed} from '@angular/core/testing';
import {ImageCropperService} from './image-cropper.service';

describe('ImageCropperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageCropperService = TestBed.get(ImageCropperService);
    expect(service).toBeTruthy();
  });

  it('should set the image to edit', () => {
    const service: ImageCropperService = TestBed.get(ImageCropperService);
    service.setImageToEdit('image');
    expect(service.getImageToEdit().get()).toBe('image');
  });

  it('should set result', () => {
    const service: ImageCropperService = TestBed.get(ImageCropperService);
    const result = new Blob();
    service.setResult(result);
    expect(service.getResult().get()).toBe(result);
  });
});
