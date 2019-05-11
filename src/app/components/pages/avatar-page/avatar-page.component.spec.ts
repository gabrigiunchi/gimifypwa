import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AvatarPageComponent} from './avatar-page.component';
import {AvatarComponent} from '../../layout/avatar/avatar.component';
import {
  MatBottomSheetModule,
  MatDialogModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  NativeDateModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs/internal/observable/of';
import {Optional} from 'src/app/model/optional';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';
import {ImageCropperService} from 'src/app/services/image-cropper.service';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {RouterModule} from '@angular/router';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';

describe('AvatarPageComponent', () => {
  let component: AvatarPageComponent;
  let fixture: ComponentFixture<AvatarPageComponent>;

  let spyOnChangeAvatar: jasmine.Spy;
  let spyOnLoadAvatar: jasmine.Spy;

  const avatarContent = 'data:image;base64,';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AvatarPageComponent,
        AvatarComponent,
        SafeUrlPipe,
        ToolbarComponent,
        LoadingComponent
      ],
      imports: [
        MatBottomSheetModule,
        MatDialogModule,
        NativeDateModule,
        HttpClientModule,
        MatIconModule,
        MatToolbarModule,
        RouterModule.forRoot([]),
        MatProgressSpinnerModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    (TestBed.get(ImageCropperService) as ImageCropperService).clear();
    const avatarService: AvatarService = TestBed.get(AvatarService);
    const mockMetadata: ImageMetadata = {id: 'default', lastModified: 0};
    spyOnChangeAvatar = spyOn(avatarService, 'changeAvatar').and.returnValue(of(mockMetadata));
    spyOnLoadAvatar = spyOnProperty(avatarService, 'myAvatar').and.returnValue(of(avatarContent));
    fixture = TestBed.createComponent(AvatarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload the new avatar if the image cropper has a result', () => {
    spyOn(TestBed.get(ImageCropperService), 'getResult').and.returnValue(Optional.of(new Blob()));
    component.ngOnInit();
    expect(spyOnChangeAvatar).toHaveBeenCalled();
  });

  it('should load the avatar if the image cropper has NOT a result', () => {
    spyOn(TestBed.get(ImageCropperService), 'getResult').and.returnValue(Optional.empty());
    component.ngOnInit();
    expect(spyOnChangeAvatar).not.toHaveBeenCalled();
  });

  it('should load the avatar and save it', () => {
    spyOn(TestBed.get(ImageCropperService), 'getResult').and.returnValue(Optional.empty());
    component.ngOnInit();
    expect(component.avatar).toBe(avatarContent);
  });
});
