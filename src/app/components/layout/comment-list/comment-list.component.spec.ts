import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommentListComponent} from './comment-list.component';
import {MatDialogModule, MatIconModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';
import {RatingBarComponent} from '../rating-bar/rating-bar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentListComponent, RatingBarComponent],
      imports: [
        MatListModule,
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
