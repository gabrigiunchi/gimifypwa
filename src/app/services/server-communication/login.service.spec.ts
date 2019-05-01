import {TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterModule.forRoot([])]
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
