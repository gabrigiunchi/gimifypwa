import {AvatarPipe} from './avatar.pipe';
import {AvatarService} from '../services/server-communication/avatar.service';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {TestConstants} from '../test-constants';

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

  it('should return the avatar of a user', () => {
    const mockResult = of(new ArrayBuffer(200));
    spyOn(TestBed.get(AvatarService), 'downloadAvatarOfUser').and.returnValue(mockResult);
    const pipe = new AvatarPipe(TestBed.get(AvatarService));
    expect(pipe.transform(TestConstants.mockUser)).toBe(mockResult);
  });
});
