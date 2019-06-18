import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewCommentDialogComponent} from './new-comment-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSliderModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TestConstants, MockDialog} from 'src/app/test-constants';
import {of} from 'rxjs';
import {CommentService} from 'src/app/services/server-communication/comment.service';
import {CommentDTO} from 'src/app/model/dto/commentDTO';

describe('NewCommentDialogComponent', () => {
  let component: NewCommentDialogComponent;
  let fixture: ComponentFixture<NewCommentDialogComponent>;
  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewCommentDialogComponent],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        MatSliderModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
        {provide: MAT_DIALOG_DATA, useValue: TestConstants.mockGym}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    const spy = spyOn(dialogRef, 'close');
    component.close();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should post a new comment', () => {
    const form = {title: 'title', message: 'message', rating: 1};
    component.form.patchValue(form);
    component.gym = TestConstants.mockGym;
    const result = TestConstants.mockComments[0];
    const spyOnPostComment = spyOn(TestBed.get(CommentService), 'postComment').and.returnValue(of(result));
    const spyOnClose = spyOn(dialogRef, 'close');
    component.submit();
    const commentDTO: CommentDTO = {gymId: TestConstants.mockGym.id, message: 'message', title: 'title', rating: 1, userId: -1};
    expect(spyOnPostComment).toHaveBeenCalledWith(commentDTO);
    expect(spyOnClose).toHaveBeenCalledWith(result);
  });
});
