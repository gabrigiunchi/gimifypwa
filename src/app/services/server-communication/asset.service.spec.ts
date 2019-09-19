import {TestBed} from '@angular/core/testing';
import {AssetService} from './asset.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';
import {SessionService} from '../session.service';
import {UrlService} from '../url.service';
import {TestConstants} from 'src/app/test-constants';

describe('AssetService', () => {

  let assetService: AssetService;
  let urlService: UrlService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  beforeEach(() => {
    assetService = TestBed.get(AssetService);
    urlService = TestBed.get(UrlService);
    spyOnProperty(TestBed.get(SessionService), 'token', 'get').and.returnValue('token');
    spyOnProperty(urlService, 'authenticationHeader', 'get').and.returnValue({});
  });

  it('should be created', () => {
    expect(assetService).toBeTruthy();
  });

  it('should get all assets', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(undefined));
    assetService.getAssets(1, 2);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.ASSETS}/page/1/size/2`, {});
  });

  it('should get an asset by id', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(undefined));
    assetService.getAssetById(1);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.ASSETS}/1`, {});
  });

  it('should get assets by gym', () => {
    const gym = TestConstants.mockGym;
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(undefined));
    assetService.getAssetsByGym(gym, 1, 10);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.ASSETS}/gym/${gym.id}/page/1/size/10`, {});
  });

  it('should get assets by kind', () => {
    const kind = TestConstants.mockAsset.kind;
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(undefined));
    assetService.getAssetsByKind(kind, 1, 10);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.ASSETS}/kind/${kind.id}/page/1/size/10`, {});
  });

  it('should get assets by gym and kind', () => {
    const gym = TestConstants.mockGym;
    const kind = TestConstants.mockAsset.kind;
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(undefined));
    assetService.getAssetsByGymAndKind(gym, kind);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.ASSETS}/gym/${gym.id}/kind/${kind.id}`, {});
  });
});
