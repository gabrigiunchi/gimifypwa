import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {Gym} from 'src/app/model/entities/gym';
import {CommentService} from 'src/app/services/server-communication/comment.service';
import {Subscription} from 'rxjs';
import {Page} from 'src/app/model/page';
import {Comment} from 'src/app/model/entities/comment';
import {finalize} from 'rxjs/operators';
import {CONSTANTS} from 'src/app/constants';
import {MatDialog} from '@angular/material';
import {NewCommentDialogComponent} from 'src/app/components/modals/dialogs/new-comment-dialog/new-comment-dialog.component';

@Component({
  selector: 'app-comments-tab',
  templateUrl: './comments-tab.component.html',
  styleUrls: ['./comments-tab.component.css']
})
export class CommentsTabComponent implements OnChanges, OnDestroy {

  readonly pageSize = CONSTANTS.COMMENT_PAGE_SIZE;

  @Input() gym: Gym;
  comments: Comment[] = [];
  currentPage: Page<Comment>;
  isLoading = false;
  currentDownload: Subscription;

  constructor(private dialog: MatDialog, private commentService: CommentService) {
  }

  ngOnChanges() {
    if (this.gym) {
      this.downloadPage(0);
    }
  }

  ngOnDestroy() {
    if (this.currentDownload) {
      this.currentDownload.unsubscribe();
    }
  }

  loadMore() {
    this.downloadPage(this.currentPage.number + 1);
  }

  private downloadPage(pageNumber: number): void {
    this.isLoading = true;
    console.log(`Downloading page ${pageNumber}`);

    if (this.currentDownload) {
      this.currentDownload.unsubscribe();
    }

    this.currentDownload = this.commentService.getCommentsByGym(this.gym, pageNumber, this.pageSize)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(newPage => {
        console.log('Downloaded page', newPage);
        this.currentPage = newPage;
        this.comments = this.comments.concat(newPage.content);
      });
  }

  get last(): boolean {
    return this.currentPage && this.currentPage.last;
  }

  pageChange(pageIndex: number): void {
    this.downloadPage(pageIndex);
  }

  newComment() {
    this.dialog.open(NewCommentDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      minWidth: '100%',
      height: '100%',
      data: this.gym
    }).afterClosed().subscribe(comment => {
      if (comment) {
        this.comments = [comment].concat(this.comments);
      }
    });
  }
}
