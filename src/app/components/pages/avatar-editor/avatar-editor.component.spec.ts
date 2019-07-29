import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AvatarEditorComponent} from './avatar-editor.component';
import {NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {ImageCropperComponent} from '../../input/image-cropper/image-cropper.component';
import {NgxCropperjsModule} from 'ngx-cropperjs';
import {Router, RouterModule} from '@angular/router';
import {ImageCropperService} from 'src/app/services/image-cropper.service';

describe('AvatarEditorComponent', () => {
  let component: AvatarEditorComponent;
  let fixture: ComponentFixture<AvatarEditorComponent>;
  let spyOnRouter: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AvatarEditorComponent,
        ImageCropperComponent,
        SafeUrlPipe,
      ],
      imports: [
        NgxCropperjsModule,
        NativeDateModule,
        HttpClientModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOnRouter = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    fixture = TestBed.createComponent(AvatarEditorComponent);
    component = fixture.componentInstance;
    component.image = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel', () => {
    component.cancel();
    expect(spyOnRouter).toHaveBeenCalledWith(['profile/avatar']);
  });

  it('should submit', () => {
    const imageCropperService: ImageCropperService = TestBed.get(ImageCropperService);
    const result = new Blob();
    component.submit(result);
    expect(imageCropperService.getResult().get()).toBe(result);
    expect(spyOnRouter).toHaveBeenCalledWith(['profile/avatar']);
  });

  it('should get the image to edit', () => {
    const router = TestBed.get(Router);
    const imageCropperService: ImageCropperService = TestBed.get(ImageCropperService);
    imageCropperService.setImageToEdit('image');
    component = new AvatarEditorComponent(imageCropperService, router);
    expect(component.image).toBe('image');
  });
});
