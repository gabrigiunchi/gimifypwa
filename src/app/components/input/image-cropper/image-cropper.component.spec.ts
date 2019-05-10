import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ImageCropperComponent} from './image-cropper.component';
import {NgxCropperjsModule} from 'ngx-cropperjs';
import {NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';

describe('ImageCropperComponent', () => {
  let component: ImageCropperComponent;
  let fixture: ComponentFixture<ImageCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCropperComponent, SafeUrlPipe],
      imports: [
        NgxCropperjsModule,
        NativeDateModule,
        HttpClientModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropperComponent);
    component = fixture.componentInstance;
    component.image = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
