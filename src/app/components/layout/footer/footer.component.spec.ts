import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FooterComponent} from './footer.component';
import {MatIconModule, MatToolbarModule} from '@angular/material';
import {FooterSectionColorPipe} from 'src/app/pipes/footer-section-color.pipe';
import {Router, RouterModule} from '@angular/router';
import {CONSTANTS} from 'src/app/constants';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent, FooterSectionColorPipe],
      imports: [
        MatIconModule,
        MatToolbarModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to a section', () => {
    const spyOnRouter = spyOn(TestBed.get(Router), 'navigateByUrl').and.callFake(() => {});
    let section = CONSTANTS.SECTIONS[0];
    component.navigate(section);
    expect(spyOnRouter).toHaveBeenCalledWith(section.link);

    section = CONSTANTS.SECTIONS[1];
    component.navigate(section);
    expect(spyOnRouter).toHaveBeenCalledWith(section.link);

    section = CONSTANTS.SECTIONS[2];
    component.navigate(section);
    expect(spyOnRouter).toHaveBeenCalledWith(section.link);

  });
});
