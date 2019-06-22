import {GymAvatarPipe} from './gym-avatar.pipe';
import {TestBed, async} from '@angular/core/testing';
import {GymImageService} from '../services/server-communication/gym-image-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {TestConstants} from '../test-constants';

describe('GymAvatarPipe', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('create an instance', () => {
    const pipe = new GymAvatarPipe(TestBed.get(GymImageService));
    expect(pipe).toBeTruthy();
  });

  it('should return the gym\'s avatar', async(() => {
    const result = of(TestConstants.str2ab('ciao'));
    const gym = TestConstants.mockGym;
    const metadata = TestConstants.mockImageMetadata[0];
    const gymImageService: GymImageService = TestBed.get(GymImageService);
    spyOn(gymImageService, 'getAvatarMetadataOfGym').and.returnValue(of(metadata));
    const spyOnDownload = spyOn(gymImageService, 'getPhotoOfGym').and.returnValue(result);
    const pipe = new GymAvatarPipe(gymImageService);
    pipe.transform(gym).subscribe(r => {
      expect(r).toEqual(result);
      expect(spyOnDownload).toHaveBeenCalledWith(metadata);
    });
  }));

  it('should return undefined if the avatar is the default one', async(() => {
    const gym = TestConstants.mockGym;
    const gymImageService: GymImageService = TestBed.get(GymImageService);
    spyOn(gymImageService, 'getAvatarMetadataOfGym').and.returnValue(of(GymImageService.DEFAULT_AVATAR_METADATA));
    const spyOnDownload = spyOn(gymImageService, 'getPhotoOfGym').and.returnValue(of(TestConstants.str2ab('ciao')));
    const pipe = new GymAvatarPipe(gymImageService);
    pipe.transform(gym).subscribe(r => {
      r.subscribe(avatar => {
        expect(avatar).toEqual(undefined);
        expect(spyOnDownload).not.toHaveBeenCalled();
      });
    });
  }));
});
