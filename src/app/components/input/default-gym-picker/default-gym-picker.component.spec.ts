import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultGymPickerComponent} from './default-gym-picker.component';
import {MatDialogModule, MatIconModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DefaultGymPickerComponent', () => {
  let component: DefaultGymPickerComponent;
  let fixture: ComponentFixture<DefaultGymPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultGymPickerComponent],
      imports: [
        MatIconModule,
        MatDialogModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultGymPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
