import {TestBed} from '@angular/core/testing';
import {AliveService} from './alive.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';

describe('AliveService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AliveService = TestBed.get(AliveService);
    expect(service).toBeTruthy();
  });

  it('should check the server\'s status', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of({message: 'ok'}));
    const service: AliveService = TestBed.get(AliveService);
    service.check();
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.ALIVE_URL}`);
  });
});
