import {AvatarPipe} from './avatar.pipe';
import {AvatarService} from '../services/server-communication/avatar.service';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {TestConstants} from '../test-constants';

describe('AvatarPipe', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it('create an instance', () => {
    const pipe = new AvatarPipe(TestBed.get(AvatarService));
    expect(pipe).toBeTruthy();
  });

  it('should return the avatar of a user', async(() => {
    const user = TestConstants.mockUser;
    const avatarService: AvatarService = TestBed.get(AvatarService);
    const mockResult = of(new ArrayBuffer(200));
    spyOn(avatarService, 'getMetadataOfUser').and.returnValue(of(TestConstants.mockImageMetadata[0]));
    const spyOnDownload = spyOn(avatarService, 'downloadAvatarOfUser').and.returnValue(mockResult);
    const pipe = new AvatarPipe(TestBed.get(AvatarService));
    pipe.transform(user).subscribe(result => {
      expect(result).toEqual(mockResult);
      expect(spyOnDownload).toHaveBeenCalledWith(user.id);
    });
  }));

  it('should return undefined if the avatar is the default one', async(() => {
    const user = TestConstants.mockUser;
    const avatarService: AvatarService = TestBed.get(AvatarService);
    const mockResult = of(undefined);
    spyOn(avatarService, 'getMetadataOfUser').and.returnValue(of(AvatarService.DEFAULT_AVATAR_METADATA));
    const spyOnDownload = spyOn(avatarService, 'downloadAvatarOfUser').and.returnValue(mockResult);
    const pipe = new AvatarPipe(TestBed.get(AvatarService));
    pipe.transform(user).subscribe(result => {
      result.subscribe(avatar => {
        expect(avatar).toEqual(undefined);
        expect(spyOnDownload).not.toHaveBeenCalled();
      });
    });
  }));
});
