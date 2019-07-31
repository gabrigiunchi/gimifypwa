import {TestBed, async} from '@angular/core/testing';
import {AssetKindService} from './asset-kind.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {UrlService} from '../url.service';
import {CONSTANTS} from 'src/app/constants';

describe('AssetKindService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeader', 'get').and.returnValue({});
  });

  it('should be created', () => {
    const service: AssetKindService = TestBed.get(AssetKindService);
    expect(service).toBeTruthy();
  });

  it('should return the asset kinds', async(() => {
    const spyOnGet = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of([]));
    const service: AssetKindService = TestBed.get(AssetKindService);
    service.assetKinds.subscribe(() => {
      expect(spyOnGet).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.ASSET_KINDS}`, {});
    });
  }));
});
