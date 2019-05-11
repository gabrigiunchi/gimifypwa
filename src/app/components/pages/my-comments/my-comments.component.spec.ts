import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MyCommentsComponent} from './my-comments.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';
import {MatIconModule, MatListModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {CommentListComponent} from '../../layout/comment-list/comment-list.component';
import {MessageComponent} from '../../layout/message/message.component';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';
import {AvatarPipe} from 'src/app/pipes/avatar.pipe';
import {RatingBarComponent} from '../../layout/rating-bar/rating-bar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';

describe('MyCommentsComponent', () => {
  let component: MyCommentsComponent;
  let fixture: ComponentFixture<MyCommentsComponent>;

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
    fixture = TestBed.createComponent(MyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
