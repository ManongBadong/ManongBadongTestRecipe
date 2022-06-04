import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthenticationService{
  constructor(private http: HttpClient) {}

  // Token
  // AIzaSyCo-DZGhzkjq-G0_6giJvX4O-s3BwKEieg

  signin() {
    let signInData = {
      email: 'testData',
      password: 'testPassword',
      returnSecureToken: true
    };

    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo-DZGhzkjq-G0_6giJvX4O-s3BwKEieg', signInData).subscribe(
      res => {
        console.log(res);
      }
    );
  }
}