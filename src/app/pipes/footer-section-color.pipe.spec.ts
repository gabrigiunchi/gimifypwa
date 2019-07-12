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

  it('should get the color for a selected section', () => {
    const router: Router = TestBed.get(Router);
    const pipe = new FooterSectionColorPipe(router);
    spyOnProperty(router, 'url', 'get').and.returnValue('home');
    expect(pipe.transform({icon: 'face', link: 'home', name: 'home'})).toBe('#3f51b5');
  });

  it('should get the color for a non-selected section', () => {
    const router: Router = TestBed.get(Router);
    const pipe = new FooterSectionColorPipe(router);
    spyOnProperty(router, 'url', 'get').and.returnValue('reservations');
    expect(pipe.transform({icon: 'face', link: 'home', name: 'home'})).toBe('black');
  });
});
