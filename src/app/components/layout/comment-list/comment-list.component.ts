import {Component, Input} from '@angular/core';
import {Comment} from 'src/app/model/entities/comment';
import {UserService} from 'src/app/services/server-communication/user.service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../modals/dialogs/confirmation-dialog/confirmation-dialog.component';
import {CommentService} from 'src/app/services/server-communication/comment.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {

  @Input() comments: Comment[];
  isDeletingComment = false;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private dialog: MatDialog) {}

  isMyComment(comment: Comment): boolean {
    return this.userService.isLoggedUser(comment.user.id);
  }

  onDeleteClick(comment: Comment) {
    const dialogData = ConfirmationDialogComponent.DEFAULT_DATA;
    dialogData.title = 'Delete comment';
    dialogData.message = 'Are you sure you want to delete your comment?';
    this.dialog.open(ConfirmationDialogComponent, {autoFocus: false, restoreFocus: false, data: dialogData})
      .afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.deleteComment(comment);
        }
      });
  }

  deleteComment(comment: Comment) {
    this.isDeletingComment = true;
    this.commentService.deleteMyComment(comment)
      .pipe(finalize(() => this.isDeletingComment = false))
      .subscribe(() => this.removeCommenFromList(comment));
  }

  private removeCommenFromList(comment: Comment) {
    this.comments = this.comments.filter(c => c.id !== comment.id);
  }

}
