import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MyCommentsComponent} from './my-comments.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';
import {MatDialogModule, MatIconModule, MatListModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {CommentListComponent} from '../../layout/comment-list/comment-list.component';
import {MessageComponent} from '../../layout/message/message.component';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';
import {AvatarPipe} from 'src/app/pipes/avatar.pipe';
import {RatingBarComponent} from '../../layout/rating-bar/rating-bar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {AvatarModule} from 'ngx-avatar';
import {TestConstants} from 'src/app/test-constants';
import {of} from 'rxjs';
import {Page} from 'src/app/model/page';
import {Comment} from 'src/app/model/entities/comment';
import {CommentService} from 'src/app/services/server-communication/comment.service';

describe('MyCommentsComponent', () => {
  let component: MyCommentsComponent;
  let fixture: ComponentFixture<MyCommentsComponent>;

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
        MyCommentsComponent,
        ToolbarComponent,
        LoadingComponent,
        CommentListComponent,
        MessageComponent,
        SafeUrlPipe,
        DataUrlPipe,
        AvatarPipe,
        RatingBarComponent
      ],
      imports: [
        ScrollingModule,
        MatIconModule,
        MatDialogModule,
        AvatarModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        MatListModule,
        MatToolbarModule,
        MatProgressSpinnerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(CommentService), 'getMyComments').and.returnValue(of(mockPage));
    fixture = TestBed.createComponent(MyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe on destroy', () => {
    component.currentDownload = of([]).subscribe();
    component.ngOnDestroy();
    expect(component.currentDownload.closed).toBe(true);
  });

  it('should not unsubscribe on destroy no download is present', () => {
    const spy = spyOn(component.currentDownload, 'unsubscribe').and.callFake(() => {});
    component.currentDownload = undefined;
    component.ngOnDestroy();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should load page 0 on init', () => {
    const spy = spyOn(component, 'downloadPage').and.callFake(() => {});
    component.ngOnInit();
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
});
