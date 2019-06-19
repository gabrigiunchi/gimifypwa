import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommentsTabComponent} from './comments-tab.component';
import {CommentListComponent} from 'src/app/components/layout/comment-list/comment-list.component';
import {MatDialog, MatDialogModule, MatIconModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {RatingBarComponent} from 'src/app/components/layout/rating-bar/rating-bar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessageComponent} from 'src/app/components/layout/message/message.component';
import {FabButtonComponent} from 'src/app/components/layout/fab-button/fab-button.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';
import {AvatarPipe} from 'src/app/pipes/avatar.pipe';
import {AvatarModule} from 'ngx-avatar';
import {CommentService} from 'src/app/services/server-communication/comment.service';
import {of} from 'rxjs';
import {Page} from 'src/app/model/page';
import {Comment} from 'src/app/model/entities/comment';
import {MockDialog, TestConstants} from 'src/app/test-constants';

describe('CommentsTabComponent', () => {
  let component: CommentsTabComponent;
  let fixture: ComponentFixture<CommentsTabComponent>;
  const mockPage: Page<Comment> = {
    content: TestConstants.mockComments.slice(0, 1),
    empty: false,
    first: false, last: false,
    number: 1,
    totalElements: 20,
    totalPages: 4
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentsTabComponent,
        CommentListComponent,
        LoadingComponent,
        MessageComponent,
        RatingBarComponent,
        FabButtonComponent,
        SafeUrlPipe,
        DataUrlPipe,
        AvatarPipe
      ],
      imports: [
        MatDialogModule,
        ScrollingModule,
        MatListModule,
        AvatarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(CommentService), 'getCommentsByGym').and.returnValue(of(mockPage));
    fixture = TestBed.createComponent(CommentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not load page 0 on changes if the gym is undefined', () => {
    const spy = spyOn(component, 'downloadPage').and.callFake(() => {});
    component.gym = undefined;
    component.ngOnChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should load page 0 on changes', () => {
    const spy = spyOn(component, 'downloadPage').and.callFake(() => {});
    component.gym = TestConstants.mockGym;
    component.ngOnChanges();
    expect(spy).toHaveBeenCalledWith(0);
  });

  it('should unsubscribe on destroy', () => {
    component.currentDownload = of([]).subscribe();
    component.ngOnDestroy();
    expect(component.currentDownload.closed).toBe(true);
  });

  it('should load more comments', () => {
    component.currentPage = mockPage;
    const spy = spyOn(component, 'downloadPage').and.callFake(() => {});
    component.loadMore();
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('should say if it is the last page', () => {
    component.currentPage = mockPage;
    mockPage.last = false;
    expect(component.last).toBe(false);
    component.currentPage.last = true;
    expect(component.last).toBe(true);
    component.currentPage = undefined;
    expect(component.last).toBe(false);
  });

  it('should download a page', () => {
    component.currentDownload = of([]).subscribe();
    component.currentPage = undefined;
    component.downloadPage(1);
    expect(component.currentPage).toEqual(mockPage);

    component.currentDownload = undefined;
    component.currentPage = undefined;
    component.downloadPage(1);
    expect(component.currentPage).toEqual(mockPage);
  });

  it('should make a new comment', () => {
    component.comments = TestConstants.mockComments.slice(0, 1);
    expect(component.comments.length).toBe(1);
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(TestConstants.mockComments[1]));
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    component.newComment();
    expect(component.comments.length).toBe(2);
  });

  it('should cancel making a new a new comment', () => {
    component.comments = TestConstants.mockComments.slice(0, 1);
    expect(component.comments.length).toBe(1);
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    component.newComment();
    expect(component.comments.length).toBe(1);
  });
});
