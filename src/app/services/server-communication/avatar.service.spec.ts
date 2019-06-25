import {async, TestBed} from '@angular/core/testing';
import {AvatarService} from './avatar.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/internal/observable/of';
import {LocalStorageKey} from 'src/app/model/local-storage-key';
import {FileSaverService} from '../file-saver.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';
import {UrlService} from '../url.service';
import {TestConstants} from 'src/app/test-constants';
import {CONSTANTS} from 'src/app/constants';

describe('AvatarService', () => {
  const metadataFromServer: ImageMetadata = {
    id: 'user6',
    lastModified: 2
  };

  let avatarService: AvatarService;
  const typeNone = {type: 'none'};
  const typeImage = {type: 'image'};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]
  }));

  beforeEach(() => {
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeaderForImages', 'get').and.returnValue(typeImage);
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeader', 'get').and.returnValue(typeNone);
    avatarService = TestBed.get(AvatarService);
  });

  it('should be created', () => {
    expect(avatarService).toBeTruthy();
  });

  it('should save the avatar metadata', () => {
    avatarService.avatarMetadata = {id: 'user6', lastModified: 1};
    const saved: ImageMetadata = JSON.parse(localStorage.getItem(LocalStorageKey.avatarMetadata));
    expect(saved.id).toBe('user6');
    expect(saved.lastModified).toBe(1);
  });

  it('should download the new avatar if there are not saved metadata', () => {
    localStorage.removeItem(LocalStorageKey.avatarMetadata);
    spyOn(avatarService, 'loadMyAvatarMetadata').and.returnValue(of(metadataFromServer));
    spyOnProperty(avatarService, 'avatarMetadata', 'get').and.returnValue(null);
    const spy = spyOn(avatarService, 'downloadMyAvatar').and.returnValue(of('avatarcontent'));
    avatarService.checkAvatar();
    expect(spy).toHaveBeenCalled();
    const savedMetadata: ImageMetadata = JSON.parse(localStorage.getItem(LocalStorageKey.avatarMetadata));
    expect(savedMetadata).toBeTruthy();
    expect(savedMetadata.id).toBe(metadataFromServer.id);
    expect(savedMetadata.lastModified).toBe(metadataFromServer.lastModified);
  });

  it('should download the new avatar if the one cached is not up to date', () => {
    spyOn(avatarService, 'loadMyAvatarMetadata').and.returnValue(of(metadataFromServer));
    const spy = spyOn(avatarService, 'downloadMyAvatar').and.returnValue(of('avatarcontent'));
    avatarService.avatarMetadata = {id: 'user6', lastModified: 1};
    avatarService.checkAvatar();
    expect(spy).toHaveBeenCalled();

    const savedMetadata: ImageMetadata = JSON.parse(localStorage.getItem(LocalStorageKey.avatarMetadata));
    expect(savedMetadata).toBeTruthy();
    expect(savedMetadata.id).toBe(metadataFromServer.id);
    expect(savedMetadata.lastModified).toBe(metadataFromServer.lastModified);
  });

  it('should do nothing if the avatar is up to date', () => {
    spyOn(avatarService, 'loadMyAvatarMetadata').and.returnValue(of(metadataFromServer));
    avatarService.avatarMetadata = metadataFromServer;
    const spy = spyOn(avatarService, 'downloadMyAvatar').and.returnValue(of('avatarcontent'));
    avatarService.checkAvatar();
    expect(spy).not.toHaveBeenCalled();

    const savedMetadata: ImageMetadata = JSON.parse(localStorage.getItem(LocalStorageKey.avatarMetadata));
    expect(savedMetadata).toBeTruthy();
    expect(savedMetadata.id).toBe(metadataFromServer.id);
    expect(savedMetadata.lastModified).toBe(metadataFromServer.lastModified);
  });

  it('should load the avatar from localstorage if present', async(() => {
    const content = 'dajnjdans';
    spyOnProperty(avatarService, 'cachedAvatar', 'get').and.returnValue(content);
    const spyOnDownloadAvatar = spyOn(avatarService, 'downloadMyAvatar').and.returnValue(of(''));
    expect(avatarService.myAvatar).toBe(content);
    expect(spyOnDownloadAvatar).not.toHaveBeenCalled();
  }));

  it('should not load the avatar from localstorage if not present', async(() => {
    spyOnProperty(avatarService, 'cachedAvatar', 'get').and.returnValue(undefined);
    expect(avatarService.myAvatar).toBeUndefined();
  }));

  it('should clear the cache', () => {
    avatarService.avatarMetadata = metadataFromServer;
    localStorage.setItem(LocalStorageKey.avatar, 'dajsndsa');
    avatarService.clearCache();
    const metadataInCache: ImageMetadata = JSON.parse(localStorage.getItem(LocalStorageKey.avatarMetadata));
    expect(localStorage.getItem(LocalStorageKey.avatar)).toBeFalsy();
    expect(metadataInCache.id).toBe(AvatarService.DEFAULT_AVATAR_METADATA.id);
    expect(metadataInCache.lastModified).toBe(AvatarService.DEFAULT_AVATAR_METADATA.lastModified);
  });

  it('should download my avatar', async(() => {
    const content: ArrayBuffer = TestConstants.str2ab('content');
    const spyOnDownload = spyOn(avatarService, 'download').and.returnValue(of(content));
    const spyOnFileSaver = spyOn(TestBed.get(FileSaverService), 'saveImage').and.returnValue(of({}));
    avatarService.downloadMyAvatar().subscribe(() => {
      expect(spyOnDownload).toHaveBeenCalled();
      expect(spyOnFileSaver).toHaveBeenCalled();
    });
  }));

  it('should change the avatar with an arraybuffer', async(() => {
    const resultMetadata: ImageMetadata = {id: 'user6', lastModified: 328798724982};
    const spy = spyOn(TestBed.get(HttpClient), 'put').and.returnValue(of(resultMetadata));
    const avatar: ArrayBuffer = TestConstants.str2ab('content');
    avatarService.changeAvatar(avatar).subscribe(() => {
      expect(spy).toHaveBeenCalled();

      // Should have saved the new metadata
      const savedMetadata: ImageMetadata = JSON.parse(localStorage.getItem(LocalStorageKey.avatarMetadata));
      expect(savedMetadata.id).toBe(resultMetadata.id);
      expect(savedMetadata.lastModified).toBe(resultMetadata.lastModified);
    });
  }));

  it('should change the avatar with a blob', async(() => {
    const resultMetadata: ImageMetadata = {id: 'user6', lastModified: 328798724982};
    const spy = spyOn(TestBed.get(HttpClient), 'put').and.returnValue(of(resultMetadata));
    const avatar: Blob = new Blob([TestConstants.str2ab('content')], {type: 'image'});
    avatarService.changeAvatar(avatar).subscribe(() => {
      expect(spy).toHaveBeenCalled();

      // Should have saved the new metadata
      const savedMetadata: ImageMetadata = JSON.parse(localStorage.getItem(LocalStorageKey.avatarMetadata));
      expect(savedMetadata.id).toBe(resultMetadata.id);
      expect(savedMetadata.lastModified).toBe(resultMetadata.lastModified);
    });
  }));

  it('should delete the avatar', async(() => {
    const resultMetadata: ImageMetadata = AvatarService.DEFAULT_AVATAR_METADATA;
    spyOn(TestBed.get(HttpClient), 'delete').and.returnValue(of({}));
    const spy = spyOn(avatarService, 'downloadMyAvatar').and.returnValue(of(''));
    avatarService.deleteAvatar().subscribe(() => {
      expect(spy).not.toHaveBeenCalled();

      // Should have saved the new metadata
      const savedMetadata: ImageMetadata = JSON.parse(localStorage.getItem(LocalStorageKey.avatarMetadata));
      expect(savedMetadata.id).toBe(resultMetadata.id);
      expect(savedMetadata.lastModified).toBe(resultMetadata.lastModified);
    });
  }));

  it('should download an image', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.str2ab('avatar')));
    avatarService.download('endpoint');
    expect(spy).toHaveBeenCalledWith('endpoint', typeImage);
  });

  it('should download an avatar', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.str2ab('avatar')));
    avatarService.downloadAvatar('endpoint');
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.AVATARS}/endpoint`, typeImage);
  });

  it('should download my avatar', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.str2ab('avatar')));
    avatarService.downloadMyAvatar();
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.MY_AVATAR}`, typeImage);
  });

  it('should download the avatar of a user', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.str2ab('avatar')));
    avatarService.downloadAvatarOfUser(1);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.AVATARS}/of_user/1`, typeImage);
  });

  it('should download the default avatars', async(() => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of([]));
    avatarService.presetAvatarMetadata.subscribe(() => {
      expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.PRESET_AVATARS}`, typeNone);
    });
  }));

  it('should download the avatar metadata of a user', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.mockImageMetadata[0]));
    avatarService.getMetadataOfUser(1);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.AVATARS}/metadata/of_user/1`, typeNone);
  });

  it('should download my avatar metadata', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(TestConstants.mockImageMetadata[0]));
    avatarService.loadMyAvatarMetadata();
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.MY_AVATAR}/metadata`, typeNone);
  });

  it('should not download the default avatar so the initials can be used for the avatar', () => {
    localStorage.clear();
    const spyOnDownloadMyAvatar = spyOn(avatarService, 'downloadMyAvatar').and.callFake(() => {});
    spyOn(avatarService, 'loadMyAvatarMetadata').and.returnValue(of(AvatarService.DEFAULT_AVATAR_METADATA));
    avatarService.checkAvatar();
    expect(spyOnDownloadMyAvatar).not.toHaveBeenCalled();
  });

  it('should broadcast the default avatar so the initials can be used for the avatar', async(() => {
    avatarService.avatarChanged$.subscribe(avatar => {
      expect(avatar).toBeUndefined();
    });
    avatarService.avatarMetadata = AvatarService.DEFAULT_AVATAR_METADATA;
    const spyOnDownloadMyAvatar = spyOn(avatarService, 'downloadMyAvatar').and.callFake(() => {});
    spyOn(avatarService, 'loadMyAvatarMetadata').and.returnValue(of(AvatarService.DEFAULT_AVATAR_METADATA));
    avatarService.checkAvatar();
    expect(spyOnDownloadMyAvatar).not.toHaveBeenCalled();
  }));
});
