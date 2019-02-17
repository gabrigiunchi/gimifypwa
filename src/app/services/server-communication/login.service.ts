import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';
import {UrlService} from '../url.service';
import {tap, delay} from 'rxjs/operators';
import {SessionService} from '../session.service';
import {Token} from 'src/app/model/dto/token';
import {Credentials} from 'src/app/model/dto/credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  redirectUrl = '';
  private _isLoggedIn = false;
  private _isLoading = false;

  constructor(
    private sessionService: SessionService,
    private urlService: UrlService, private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  login(username: string, password: string): Observable<Token> {
    const credentials: Credentials = {username: username, password: password};
    console.log('Logging in as ', credentials);

    const url = this.urlService.getRestUrl(CONSTANTS.LOGIN_URL);
    return this.http.post<Token>(url, credentials)
      .pipe(tap((result: Token) => {
        console.log('Login successfull');
        console.log(result.token);
        this.sessionService.token = result.token;
        this._isLoggedIn = true;
      }));
  }

  checkToken(): Observable<boolean> {
    this._isLoading = true;
    return of(false).pipe(
      delay(2000),
      tap(result => {
        console.log('Server responsed, the token is ' + (result ? 'valid' : 'invalid'));
        this._isLoggedIn = result;
        this._isLoading = false;
      })
    );
  }
}
