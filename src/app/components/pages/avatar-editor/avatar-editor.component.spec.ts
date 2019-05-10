import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AvatarEditorComponent} from './avatar-editor.component';
import {NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {ImageCropperComponent} from '../../input/image-cropper/image-cropper.component';
import {NgxCropperjsModule} from 'ngx-cropperjs';
import {RouterModule} from '@angular/router';

describe('AvatarEditorComponent', () => {
  let component: AvatarEditorComponent;
  let fixture: ComponentFixture<AvatarEditorComponent>;

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
    fixture = TestBed.createComponent(AvatarEditorComponent);
    component = fixture.componentInstance;
    component.image = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});