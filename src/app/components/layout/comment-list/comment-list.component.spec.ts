import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommentListComponent} from './comment-list.component';
import {MatDialogModule, MatIconModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';
import {RatingBarComponent} from '../rating-bar/rating-bar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {AvatarPipe} from 'src/app/pipes/avatar.pipe';
import {AvatarModule} from 'ngx-avatar';

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
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
