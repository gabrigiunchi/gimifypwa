import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommentsTabComponent} from './comments-tab.component';
import {CommentListComponent} from 'src/app/components/layout/comment-list/comment-list.component';
import {MatIconModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {RatingBarComponent} from 'src/app/components/layout/rating-bar/rating-bar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CommentsTabComponent', () => {
  let component: CommentsTabComponent;
  let fixture: ComponentFixture<CommentsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentsTabComponent,
        CommentListComponent,
        LoadingComponent,
        RatingBarComponent
      ],
      imports: [
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
