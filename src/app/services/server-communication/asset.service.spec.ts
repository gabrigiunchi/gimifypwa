import {TestBed} from '@angular/core/testing';
import {AssetService} from './asset.service';
import {HttpClientModule} from '@angular/common/http';

describe('AssetService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AssetService = TestBed.get(AssetService);
    expect(service).toBeTruthy();
  });
});
