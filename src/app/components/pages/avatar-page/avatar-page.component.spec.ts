import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AvatarPageComponent} from './avatar-page.component';
import {AvatarComponent} from '../../layout/avatar/avatar.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatDialog,
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
import {Router, RouterModule} from '@angular/router';
import {AvatarModule} from 'ngx-avatar';
import {SessionService} from 'src/app/services/session.service';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {EditAvatarActionEnum} from '../../modals/edit-avatar-bottom-sheet/edit-avatar-bottom-sheet.component';

describe('AvatarPageComponent', () => {
  let component: AvatarPageComponent;
  let fixture: ComponentFixture<AvatarPageComponent>;

  let spyOnChangeAvatar: jasmine.Spy;
  let spyOnLoadAvatar: jasmine.Spy;
  let spyOnRouter: jasmine.Spy;

  const avatarContent = 'data:image;base64,';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AvatarPageComponent,
        AvatarComponent,
        SafeUrlPipe,
        LoadingComponent
      ],
      imports: [
        MatBottomSheetModule,
        MatDialogModule,
        NativeDateModule,
        AvatarModule,
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
    spyOnRouter = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    spyOnProperty(TestBed.get(SessionService), 'user').and.returnValue(TestConstants.mockUser);
    (TestBed.get(ImageCropperService) as ImageCropperService).clear();
    const avatarService: AvatarService = TestBed.get(AvatarService);
    const mockMetadata: ImageMetadata = {id: 'default', lastModified: 0};
    spyOnChangeAvatar = spyOn(avatarService, 'changeAvatar').and.returnValue(of(mockMetadata));
    spyOnLoadAvatar = spyOnProperty(avatarService, 'myAvatar').and.returnValue(avatarContent);
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

  it('should go back to the profile page', () => {
    component.back();
    expect(spyOnRouter).toHaveBeenCalledWith(['./profile']);
  });

  it('should delete the avatar', () => {
    const bottomSheet = new MockDialog();
    const dialog = new MockDialog();
    spyOn(bottomSheet, 'afterDismissed').and.returnValue(of(EditAvatarActionEnum.delete));
    spyOn(dialog, 'afterClosed').and.returnValue(of(true));
    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialog);
    spyOn(TestBed.get(MatBottomSheet), 'open').and.returnValue(bottomSheet);
    const spyOnDelete = spyOn(TestBed.get(AvatarService), 'deleteAvatar').and.returnValue(of({}));
    component.openBottomSheet();
    expect(spyOnDelete).toHaveBeenCalled();
  });

  it('should cancel the cancellation of the avatar', () => {
    const bottomSheet = new MockDialog();
    const dialog = new MockDialog();
    spyOn(bottomSheet, 'afterDismissed').and.returnValue(of(EditAvatarActionEnum.delete));
    spyOn(dialog, 'afterClosed').and.returnValue(of(false));
    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialog);
    spyOn(TestBed.get(MatBottomSheet), 'open').and.returnValue(bottomSheet);
    const spyOnDelete = spyOn(TestBed.get(AvatarService), 'deleteAvatar').and.returnValue(of({}));
    component.openBottomSheet();
    expect(spyOnDelete).not.toHaveBeenCalled();
  });

  it('should choose a default avatar', () => {
    const bottomSheet = new MockDialog();
    spyOn(bottomSheet, 'afterDismissed').and.returnValue(of(EditAvatarActionEnum.chooseFromDefault));
    spyOn(TestBed.get(MatBottomSheet), 'open').and.returnValue(bottomSheet);
    component.openBottomSheet();
    expect(spyOnRouter).toHaveBeenCalledWith(['profile/avatar/defaults']);
  });

  it('should modify the current avatar', () => {
    component.avatar = 'avatar';
    const bottomSheet = new MockDialog();
    spyOn(bottomSheet, 'afterDismissed').and.returnValue(of(EditAvatarActionEnum.modifyCurrent));
    spyOn(TestBed.get(MatBottomSheet), 'open').and.returnValue(bottomSheet);
    component.openBottomSheet();
    expect(spyOnRouter).toHaveBeenCalledWith(['/profile/avatar/modify']);
    expect((TestBed.get(ImageCropperService) as ImageCropperService).getImageToEdit().get()).toBe('avatar');
  });

  it('should cancel the edit', () => {
    component.avatar = 'avatar';
    const bottomSheet = new MockDialog();
    spyOn(bottomSheet, 'afterDismissed').and.returnValue(of(EditAvatarActionEnum.cancel));
    spyOn(TestBed.get(MatBottomSheet), 'open').and.returnValue(bottomSheet);
    const spyOnDialog = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(new MockDialog());
    component.openBottomSheet();
    expect(spyOnRouter).not.toHaveBeenCalled();
    expect(spyOnDialog).not.toHaveBeenCalled();
  });

  it('should change the avatar when it is updated', () => {
    spyOn(TestBed.get(ImageCropperService), 'getResult').and.returnValue(Optional.empty());
    spyOn(component, 'loadAvatar').and.callFake(() => {});
    component.avatar = undefined;
    (TestBed.get(AvatarService) as AvatarService).avatarChanged$ = of('avatar');
    component.ngOnInit();
    expect(component.avatar).toBe('avatar');
  });

  it('should pick a file', () => {
    const event = {target: {files: [TestConstants.strToBlob('avatar')]}};
    component.onFileSelected(event);
  });
});
