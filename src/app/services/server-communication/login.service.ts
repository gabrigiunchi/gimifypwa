import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';
import {UrlService} from '../url.service';
import {tap} from 'rxjs/operators';
import {SessionService} from '../session.service';
import {Token} from 'src/app/model/dto/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private sessionService: SessionService,
    private urlService: UrlService, private http: HttpClient) {}

  login(): Observable<Token> {
    const url = this.urlService.getRestUrl(CONSTANTS.LOGIN_URL);
    return this.http.post<Token>(url, {username: 'gabrigiunchi', password: 'aaaa'})
      .pipe(tap((result: Token) => {
        console.log('Login successfull');
        console.log(result.token);
        this.sessionService.token = result.token;
      }));
  }
}
