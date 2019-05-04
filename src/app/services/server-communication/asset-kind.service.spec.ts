import {TestBed} from '@angular/core/testing';
import {AssetKindService} from './asset-kind.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AssetKindService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AssetKindService = TestBed.get(AssetKindService);
    expect(service).toBeTruthy();
  });
});
