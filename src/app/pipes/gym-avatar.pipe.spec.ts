import {GymAvatarPipe} from './gym-avatar.pipe';
import {TestBed} from '@angular/core/testing';
import {GymImageService} from '../services/server-communication/gym-image-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GymAvatarPipe', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('create an instance', () => {
    const pipe = new GymAvatarPipe(TestBed.get(GymImageService));
    expect(pipe).toBeTruthy();
  });
});
