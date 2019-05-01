import {inject, TestBed} from '@angular/core/testing';
import {LoginGuard} from './login.guard';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard],
      imports: [HttpClientModule, RouterModule.forRoot([])]
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
