import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Gym} from 'src/app/model/entities/gym';
import {CommentService} from 'src/app/services/server-communication/comment.service';
import {CommentDTO} from 'src/app/model/dto/commentDTO';
import {finalize} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CONSTANTS} from 'src/app/constants';

@Component({
  selector: 'app-new-comment-dialog',
  templateUrl: './new-comment-dialog.component.html',
  styleUrls: ['./new-comment-dialog.component.css']
})
export class NewCommentDialogComponent {

  readonly maxMessageLength = CONSTANTS.COMMENT_MESSAGE_MAX_LENGTH;
  readonly maxTitleLength = CONSTANTS.COMMENT_TITLE_MAX_LENGTH;
  form = new FormGroup({
    'title': new FormControl('', [Validators.required, Validators.maxLength(CONSTANTS.COMMENT_TITLE_MAX_LENGTH)]),
    'message': new FormControl('', [Validators.required, Validators.maxLength(CONSTANTS.COMMENT_MESSAGE_MAX_LENGTH)]),
    'rating': new FormControl(1, [Validators.required]),
  });

  isPosting = false;

  constructor(
    private commentService: CommentService,
    private dialogRef: MatDialogRef<NewCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public gym: Gym) {
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.isPosting = true;
    const commentDTO: CommentDTO = {gymId: this.gym.id, message: this.message, rating: this.rating, title: this.title, userId: -1};
    console.log(`Posting comment to gym ${this.gym.id}`, commentDTO);
    this.commentService.postComment(commentDTO)
      .pipe(finalize(() => this.isPosting = true))
      .subscribe(result => this.dialogRef.close(result));
  }

  private get rating(): number {
    return this.form.get('rating').value;
  }

  get title(): string {
    return this.form.get('title').value;
  }

  get message(): string {
    return this.form.get('message').value;
  }

}
