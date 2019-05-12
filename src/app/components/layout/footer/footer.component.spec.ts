import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FooterComponent} from './footer.component';
import {MatIconModule, MatToolbarModule} from '@angular/material';
import {FooterSectionColorPipe} from 'src/app/pipes/footer-section-color.pipe';
import {RouterModule} from '@angular/router';

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
});
