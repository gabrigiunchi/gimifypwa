import {TestBed, inject} from '@angular/core/testing';
import {LoginGuard} from './login.guard';
import {HttpClientModule} from '@angular/common/http';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
