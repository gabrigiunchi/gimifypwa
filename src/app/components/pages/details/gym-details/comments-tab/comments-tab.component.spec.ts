import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommentsTabComponent} from './comments-tab.component';
import {CommentListComponent} from 'src/app/components/layout/comment-list/comment-list.component';
import {MatDialogModule, MatIconModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {RatingBarComponent} from 'src/app/components/layout/rating-bar/rating-bar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessageComponent} from 'src/app/components/layout/message/message.component';
import {FabButtonComponent} from 'src/app/components/layout/fab-button/fab-button.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

describe('CommentsTabComponent', () => {
  let component: CommentsTabComponent;
  let fixture: ComponentFixture<CommentsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentsTabComponent,
        CommentListComponent,
        LoadingComponent,
        MessageComponent,
        RatingBarComponent,
        FabButtonComponent
      ],
      imports: [
        MatDialogModule,
        ScrollingModule,
        MatListModule,
        MatIconModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
