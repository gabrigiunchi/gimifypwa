import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AssetKindPickerComponent} from './asset-kind-picker.component';
import {MatDialogModule, MatIconModule, MatInputModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AssetKindPickerComponent', () => {
  let component: AssetKindPickerComponent;
  let fixture: ComponentFixture<AssetKindPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetKindPickerComponent],
      imports: [
        MatIconModule,
        MatInputModule,
        HttpClientTestingModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetKindPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
