import {AvatarPipe} from './avatar.pipe';
import {AvatarService} from '../services/server-communication/avatar.service';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AvatarPipe', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it('create an instance', () => {
    const pipe = new AvatarPipe(TestBed.get(AvatarService));
    expect(pipe).toBeTruthy();
  });
});
