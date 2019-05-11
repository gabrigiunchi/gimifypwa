import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';
import {Gym} from 'src/app/model/entities/gym';
import {Observable} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';
import {CommentDTO} from 'src/app/model/dto/commentDTO';
import {Page} from 'src/app/model/page';
import {Comment} from 'src/app/model/entities/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private urlService: UrlService) {
  }

  getCommentsByGym(gym: Gym, page: number, size: number): Observable<Page<Comment>> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.COMMENTS}/by_gym/${gym.id}/page/${page}/size/${size}`);
    return this.http.get<Page<Comment>>(url, this.urlService.authenticationHeader);
  }

  getMyComments(page: number, size: number): Observable<Page<Comment>> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.COMMENTS}/me/page/${page}/size/${size}`);
    return this.http.get<Page<Comment>>(url, this.urlService.authenticationHeader);
  }

  postComment(comment: CommentDTO): Observable<Comment> {
    return this.http.post<Comment>(
      this.urlService.getRestUrl(`${CONSTANTS.COMMENTS}/me`),
      comment,
      this.urlService.authenticationHeader);
  }

  deleteMyComment(comment: Comment): Observable<{}> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.COMMENTS}/me/${comment.id}`);
    return this.http.delete(url, this.urlService.authenticationHeader);
  }

  get myCommentsCount(): Observable<number> {
    return this.http.get<number>(
      this.urlService.getRestUrl(`${CONSTANTS.COMMENTS}/me/count`),
      this.urlService.authenticationHeader);
  }
}
