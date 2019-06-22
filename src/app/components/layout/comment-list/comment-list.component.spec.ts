import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommentListComponent} from './comment-list.component';
import {MatDialog, MatDialogModule, MatIconModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';
import {RatingBarComponent} from '../rating-bar/rating-bar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {AvatarPipe} from 'src/app/pipes/avatar.pipe';
import {AvatarModule} from 'ngx-avatar';
import {CommentService} from 'src/app/services/server-communication/comment.service';
import {of} from 'rxjs';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {SessionService} from 'src/app/services/session.service';
import {UserService} from 'src/app/services/server-communication/user.service';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentListComponent,
        RatingBarComponent,
        DataUrlPipe,
        SafeUrlPipe,
        AvatarPipe
      ],
      imports: [
        MatListModule,
        AvatarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const avatarService: AvatarService = TestBed.get(AvatarService);
    const mockResult = of(of(new ArrayBuffer(200)));
    spyOn(avatarService, 'downloadAvatarOfUser').and.returnValue(mockResult);
    spyOn(avatarService, 'getMetadataOfUser').and.returnValue(of(TestConstants.mockImageMetadata[0]));

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    component.comments = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a comment', () => {
    const spyOnDelete = spyOn(TestBed.get(CommentService), 'deleteMyComment').and.returnValue(of({}));
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(true));
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    component.onDeleteClick(TestConstants.mockComments[0]);
    expect(spyOnDelete).toHaveBeenCalled();
  });

  it('should abort the cancellation of a comment', () => {
    const spyOnDelete = spyOn(TestBed.get(CommentService), 'deleteMyComment').and.returnValue(of({}));
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(false));
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    component.onDeleteClick(TestConstants.mockComments[0]);
    expect(spyOnDelete).not.toHaveBeenCalled();
  });

  it('should say if a comment is the logged user\'s one', () => {
    const comment = TestConstants.mockComments[0];
    spyOnProperty(TestBed.get(SessionService), 'user', 'get').and.returnValue({id: comment.user.id});
    expect(component.isMyComment(TestConstants.mockComments[0])).toBe(true);
    expect(component.isMyComment(TestConstants.mockComments[1])).toBe(false);
  });
});
