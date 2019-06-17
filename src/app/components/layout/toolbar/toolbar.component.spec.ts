import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ToolbarComponent} from './toolbar.component';
import {MatIconModule, MatToolbarModule} from '@angular/material';
import {Router, RouterModule} from '@angular/router';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        MatToolbarModule,
        MatIconModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back', () => {
    const spy = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    component.back = '/reservations';
    component.onBackClick();
    expect(spy).toHaveBeenCalledWith(['/reservations']);
  });
});
