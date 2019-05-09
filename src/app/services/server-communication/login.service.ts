import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CONSTANTS} from 'src/app/constants';
import {UrlService} from '../url.service';
import {tap} from 'rxjs/operators';
import {SessionService} from '../session.service';
import {Token} from 'src/app/model/dto/token';
import {Credentials} from 'src/app/model/dto/credentials';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  redirectUrl = '';
  private _isLoggedIn = false;
  private _isLoading = false;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private urlService: UrlService,
    private http: HttpClient) {
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  login(username: string, password: string): Observable<Token> {
    const credentials: Credentials = {username: username, password: password};
    console.log('Logging in as ' + credentials.username);

    const url = this.urlService.getRestUrl(CONSTANTS.LOGIN_URL);
    return this.http.post<Token>(url, credentials)
      .pipe(tap((result: Token) => {
        console.log('Login successful');
        console.log(result.token);
        this.sessionService.token = result.token;
        this.sessionService.user = result.user;
        this._isLoggedIn = true;
      }));
  }

  logout() {
    console.log('Logging out...');
    this._isLoggedIn = false;
    this.sessionService.clear();
    this.router.navigateByUrl('/login');
  }

  checkToken(token: string): Observable<boolean> {
    this._isLoading = true;
    const url = this.urlService.getRestUrl(CONSTANTS.LOGIN_URL + '/token');
    return this.http.post<boolean>(url, token).pipe(
      tap(valid => {
        console.log('Server responsed, the token is ' + (valid ? 'valid' : 'invalid'));
        this._isLoggedIn = valid;
        this._isLoading = false;
      })
    );
  }
}
