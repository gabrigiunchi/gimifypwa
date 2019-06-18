import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from 'src/app/services/server-communication/comment.service';
import {Page} from 'src/app/model/page';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {CONSTANTS} from 'src/app/constants';
import {Comment} from 'src/app/model/entities/comment';

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.css']
})
export class MyCommentsComponent implements OnInit, OnDestroy {

  readonly pageSize = CONSTANTS.COMMENT_PAGE_SIZE;

  comments: Comment[] = [];
  currentPage: Page<Comment>;
  isLoading = false;
  currentDownload: Subscription;

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.downloadPage(0);
  }

  ngOnDestroy() {
    if (this.currentDownload) {
      this.currentDownload.unsubscribe();
    }
  }

  loadMore() {
    this.downloadPage(this.currentPage.number + 1);
  }

  downloadPage(pageNumber: number): void {
    this.isLoading = true;
    console.log(`Downloading page ${pageNumber}`);

    if (this.currentDownload) {
      this.currentDownload.unsubscribe();
    }

    this.currentDownload = this.commentService.getMyComments(pageNumber, this.pageSize)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(newPage => {
        console.log('Downloaded page', newPage);
        this.currentPage = newPage;
        this.comments = this.comments.concat(newPage.content);
      });
  }

  get last(): boolean {
    return !!(this.currentPage && this.currentPage.last);
  }
}
