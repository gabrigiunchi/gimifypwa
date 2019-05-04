import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectLocationFormComponent} from './select-location-form.component';
import {MatIconModule, MatDialogModule} from '@angular/material';

describe('SelectLocationFormComponent', () => {
  let component: SelectLocationFormComponent;
  let fixture: ComponentFixture<SelectLocationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectLocationFormComponent],
      imports: [
        MatIconModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
