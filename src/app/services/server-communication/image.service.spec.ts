import {TestBed} from '@angular/core/testing';
import {ImageService} from './image.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ImageService = TestBed.get(ImageService);
    expect(service).toBeTruthy();
  });
});
