import {TestBed, async} from '@angular/core/testing';
import {CommentService} from './comment.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';
import {of} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';
import {TestConstants} from 'src/app/test-constants';
import {CommentDTO} from 'src/app/model/dto/commentDTO';

describe('CommentService', () => {

  let commentService: CommentService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  beforeEach(() => {
    commentService = TestBed.get(CommentService);
    spyOnProperty(TestBed.get(UrlService), 'authenticationHeader', 'get').and.returnValue({});
  });


  it('should be created', () => {
    const service: CommentService = TestBed.get(CommentService);
    expect(service).toBeTruthy();
  });

  it('should my comments by gym', () => {
    const gym = TestConstants.mockGym;
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of([]));
    commentService.getCommentsByGym(gym, 1, 10);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.COMMENTS}/by_gym/${gym.id}/page/1/size/10`, {});
  });

  it('should get my comments', () => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of([]));
    commentService.getMyComments(1, 10);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.COMMENTS}/me/page/1/size/10`, {});
  });

  it('should post a comment', () => {
    const comment: CommentDTO = {gymId: 1, message: '', rating: 1, title: '', userId: 1};
    const spy = spyOn(TestBed.get(HttpClient), 'post').and.returnValue(of({}));
    commentService.postComment(comment);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.COMMENTS}/me`, comment, {});
  });

  it('should delete a comment', () => {
    const comment = TestConstants.mockComments[0];
    const spy = spyOn(TestBed.get(HttpClient), 'delete').and.returnValue(of({}));
    commentService.deleteMyComment(comment);
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.COMMENTS}/me/${comment.id}`, {});
  });

  it('should get my comment count', async(() => {
    const spy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(1));
    commentService.myCommentsCount.subscribe(res => expect(res).toBe(1));
    expect(spy).toHaveBeenCalledWith(`${CONSTANTS.BASE_URL}${CONSTANTS.COMMENTS}/me/count`, {});
  }));
});
