import {async, TestBed} from '@angular/core/testing';
import {AvatarService} from './avatar.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/internal/observable/of';
import {LocalStorageKey} from 'src/app/model/local-storage-key';
import {FileSaverService} from '../file-saver.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';
import {UrlService} from '../url.service';

describe('AvatarService', () => {
  const metadataFromServer: ImageMetadata = {
    id: 'user6',
    lastModified: 2
  };

  const strToArrayBuffer = (str: string): ArrayBuffer => {
    const buf = new ArrayBuffer(str.length * 2);
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  };

  let avatarService: AvatarService;

  const mockUrlService = jasmine.createSpyObj('UrlService', ['getRestUrl']);
  mockUrlService.getRestUrl.and.returnValue('');

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      {provide: UrlService, useValue: mockUrlService},
    ]
  }));

  beforeEach(() => {
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
    const spyOnSavedAvatar = spyOnProperty(avatarService, 'cachedAvatar', 'get').and.returnValue(content);
    const spyOnDownloadAvatar = spyOn(avatarService, 'downloadMyAvatar').and.returnValue(of(''));
    avatarService.myAvatar.subscribe(avatar => expect(avatar).toBe(content));
    expect(spyOnSavedAvatar).toHaveBeenCalled();
    expect(spyOnDownloadAvatar).not.toHaveBeenCalled();
  }));

  it('should download the avatar from server if there is not one saved', async(() => {
    const avatarFromServer = 'djsanda';
    spyOnProperty(avatarService, 'cachedAvatar', 'get').and.returnValue(undefined);
    const spyOnDownloadAvatar = spyOn(avatarService, 'downloadMyAvatar').and.returnValue(of(avatarFromServer));
    avatarService.myAvatar.subscribe(avatar => expect(avatar).toBe(avatarFromServer));
    expect(spyOnDownloadAvatar).toHaveBeenCalled();
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
    const content: ArrayBuffer = strToArrayBuffer('content');
    const spyOnDownload = spyOn(avatarService, 'download').and.returnValue(of(content));
    const spyOnFileSaver = spyOn(TestBed.get(FileSaverService), 'saveImage').and.returnValue(of({}));
    avatarService.downloadMyAvatar().subscribe(() => {
      expect(spyOnDownload).toHaveBeenCalled();
      expect(spyOnFileSaver).toHaveBeenCalled();
    });
  }));

  it('should change the avatar', async(() => {
    const resultMetadata: ImageMetadata = {id: 'user6', lastModified: 328798724982};
    const spy = spyOn(TestBed.get(HttpClient), 'put').and.returnValue(of(resultMetadata));
    const avatar: ArrayBuffer = strToArrayBuffer('content');
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
      expect(spy).toHaveBeenCalled();

      // Should have saved the new metadata
      const savedMetadata: ImageMetadata = JSON.parse(localStorage.getItem(LocalStorageKey.avatarMetadata));
      expect(savedMetadata.id).toBe(resultMetadata.id);
      expect(savedMetadata.lastModified).toBe(resultMetadata.lastModified);
    });
  }));
});
