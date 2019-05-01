import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';
import {Gym} from 'src/app/model/entities/gym';
import {Observable} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';
import {CommentDTO} from 'src/app/model/dto/commentDTO';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private urlService: UrlService) {
  }

  getCommentsByGym(gym: Gym, page: number, size: number): Observable<Comment[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.COMMENTS}/by_gym/${gym.id}/page/${page}/size/${size}`);
    return this.http.get<Comment[]>(url, this.urlService.authenticationHeader);
  }

  postComment(comment: CommentDTO): Observable<Comment> {
    return this.http.post<Comment>(
      this.urlService.getRestUrl(`${CONSTANTS.COMMENTS}/me`),
      comment,
      this.urlService.authenticationHeader);
  }

  deleteMyComment(id: number): Observable<{}> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.COMMENTS}/me/${id}`);
    return this.http.delete<Comment>(url, this.urlService.authenticationHeader);
  }
}
