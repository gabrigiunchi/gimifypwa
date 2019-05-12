import {FooterSectionColorPipe} from './footer-section-color.pipe';
import {async, TestBed} from '@angular/core/testing';
import {Router, RouterModule} from '@angular/router';

describe('FooterSectionColorPipe', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
    }).compileComponents();
  }));

  it('create an instance', () => {
    const pipe = new FooterSectionColorPipe(TestBed.get(Router));
    expect(pipe).toBeTruthy();
  });
});
