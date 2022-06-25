import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user.model';

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

  constructor(private http: HttpClient) {}

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
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo-DZGhzkjq-G0_6giJvX4O-s3BwKEieg',
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo-DZGhzkjq-G0_6giJvX4O-s3BwKEieg',
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
