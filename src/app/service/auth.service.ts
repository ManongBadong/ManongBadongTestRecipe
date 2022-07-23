import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user = new BehaviorSubject<User>(null);
  private tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  // Token
  // AIzaSyCo-DZGhzkjq-G0_6giJvX4O-s3BwKEieg

  signUp(authUser: { email: string; password: string }) {
    let signInData = {
      email: authUser.email,
      password: authUser.password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey,
        signInData
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(authUser: { email: string; password: string }) {
    let loginData = {
      email: authUser.email,
      password: authUser.password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
        loginData
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration * 1000);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    _token: string,
    _tokenExpiresIn: number
  ) {
    const expiratitonDate = new Date(
      new Date().getTime() + _tokenExpiresIn * 1000
    );
    const user = new User(email, userId, _token, expiratitonDate);
    this.user.next(user);
    this.autoLogout(_tokenExpiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!err.error || !err.error.error) return throwError(() => errorMessage);

    console.log(err);

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already is in use.';
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exists.';
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect username/password.';
    }

    return throwError(() => errorMessage);
  }
}
